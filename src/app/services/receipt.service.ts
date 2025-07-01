import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface Receipt {
  id: string;
  date: Date;
  store: string;
  total: number;
  items: ReceiptItem[];
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface ReceiptItem {
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private readonly STORAGE_KEY = 'receipts';

  constructor() {}

  async saveReceipt(receipt: Receipt): Promise<void> {
    const receipts = await this.getReceipts();
    receipts.push(receipt);
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(receipts)
    });
  }

  async getReceipts(): Promise<Receipt[]> {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    return value ? JSON.parse(value) : [];
  }

  async analyzeReceipt(imageUrl: string): Promise<Receipt> {
    // TODO: Implement actual receipt analysis with AI
    // This is a mock implementation
    return {
      id: Date.now().toString(),
      date: new Date(),
      store: 'Test Store',
      total: 100.50,
      items: [
        {
          name: 'Test Item 1',
          price: 50.25,
          quantity: 1
        },
        {
          name: 'Test Item 2',
          price: 50.25,
          quantity: 1
        }
      ]
    };
  }

  async getStatistics(): Promise<{
    totalSpent: number;
    byCategory: { [key: string]: number };
    byStore: { [key: string]: number };
  }> {
    const receipts = await this.getReceipts();
    const statistics = {
      totalSpent: 0,
      byCategory: {} as { [key: string]: number },
      byStore: {} as { [key: string]: number }
    };

    receipts.forEach(receipt => {
      statistics.totalSpent += receipt.total;
      
      // Aggregate by store
      statistics.byStore[receipt.store] = (statistics.byStore[receipt.store] || 0) + receipt.total;
      
      // Aggregate by category
      receipt.items.forEach(item => {
        if (item.category) {
          statistics.byCategory[item.category] = (statistics.byCategory[item.category] || 0) + (item.price * item.quantity);
        }
      });
    });

    return statistics;
  }
} 