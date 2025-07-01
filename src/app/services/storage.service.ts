import { Injectable } from '@angular/core';

export interface Receipt {
  id: string;
  date: Date;
  store: string;
  total: number;
  items: number;
  imageUrl?: string;
  itemsList?: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly RECEIPTS_KEY = 'receipts';

  constructor() {}

  // Save a new receipt
  saveReceipt(receipt: Receipt): void {
    const receipts = this.getReceipts();
    receipts.push(receipt);
    localStorage.setItem(this.RECEIPTS_KEY, JSON.stringify(receipts));
  }

  // Get all receipts
  getReceipts(): Receipt[] {
    const receipts = localStorage.getItem(this.RECEIPTS_KEY);
    if (!receipts) return [];
    
    const parsedReceipts = JSON.parse(receipts);
    return parsedReceipts.map((receipt: any) => ({
      ...receipt,
      date: new Date(receipt.date)
    }));
  }

  // Get receipt by ID
  getReceipt(id: string): Receipt | null {
    const receipts = this.getReceipts();
    const receipt = receipts.find(r => r.id === id);
    return receipt || null;
  }

  // Update receipt
  updateReceipt(id: string, updatedReceipt: Partial<Receipt>): void {
    const receipts = this.getReceipts();
    const index = receipts.findIndex(r => r.id === id);
    if (index !== -1) {
      receipts[index] = { ...receipts[index], ...updatedReceipt };
      localStorage.setItem(this.RECEIPTS_KEY, JSON.stringify(receipts));
    }
  }

  // Delete receipt
  deleteReceipt(id: string): void {
    const receipts = this.getReceipts();
    const filteredReceipts = receipts.filter(r => r.id !== id);
    localStorage.setItem(this.RECEIPTS_KEY, JSON.stringify(filteredReceipts));
  }

  // Get receipts by date range
  getReceiptsByDateRange(startDate: Date, endDate: Date): Receipt[] {
    const receipts = this.getReceipts();
    return receipts.filter(receipt => {
      const receiptDate = new Date(receipt.date);
      return receiptDate >= startDate && receiptDate <= endDate;
    });
  }

  // Get receipts by store
  getReceiptsByStore(store: string): Receipt[] {
    const receipts = this.getReceipts();
    return receipts.filter(receipt => 
      receipt.store.toLowerCase().includes(store.toLowerCase())
    );
  }

  // Get total spending for a date range
  getTotalSpending(startDate: Date, endDate: Date): number {
    const receipts = this.getReceiptsByDateRange(startDate, endDate);
    return receipts.reduce((total, receipt) => total + receipt.total, 0);
  }

  // Get average receipt amount for a date range
  getAverageReceipt(startDate: Date, endDate: Date): number {
    const receipts = this.getReceiptsByDateRange(startDate, endDate);
    if (receipts.length === 0) return 0;
    const total = this.getTotalSpending(startDate, endDate);
    return total / receipts.length;
  }

  // Get spending by category
  getSpendingByCategory(startDate: Date, endDate: Date): { [key: string]: number } {
    const receipts = this.getReceiptsByDateRange(startDate, endDate);
    const categories: { [key: string]: number } = {};

    receipts.forEach(receipt => {
      if (receipt.itemsList) {
        receipt.itemsList.forEach(item => {
          // TODO: Implement category detection logic
          const category = 'Uncategorized'; // Placeholder
          categories[category] = (categories[category] || 0) + item.price * item.quantity;
        });
      }
    });

    return categories;
  }

  // Get top stores
  getTopStores(limit: number = 5): { name: string; visits: number; total: number }[] {
    const receipts = this.getReceipts();
    const stores: { [key: string]: { visits: number; total: number } } = {};

    receipts.forEach(receipt => {
      if (!stores[receipt.store]) {
        stores[receipt.store] = { visits: 0, total: 0 };
      }
      stores[receipt.store].visits++;
      stores[receipt.store].total += receipt.total;
    });

    return Object.entries(stores)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.total - a.total)
      .slice(0, limit);
  }
} 