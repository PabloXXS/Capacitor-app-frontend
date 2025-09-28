import { Injectable } from '@angular/core';

export interface Receipt {
  id: string;
  title: string;
  summ: number;
  image: string;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  private receipts: Receipt[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const stores = [
      'Магнит',
      'Пятерочка',
      'Лента',
      'Перекресток',
      'Дикси',
      'Азбука Вкуса',
    ];

    for (let i = 0; i < 10; i++) {
      const randomStore = stores[Math.floor(Math.random() * stores.length)];
      const randomSum = Math.floor(Math.random() * 5000) + 100;
      const randomDaysAgo = Math.floor(Math.random() * 30);
      const date = new Date();
      date.setDate(date.getDate() - randomDaysAgo);

      this.receipts.push({
        id: `receipt_${i + 1}`,
        title: randomStore,
        summ: randomSum,
        image: 'assets/sample-check.png',
        date: date,
      });
    }

    // Сортируем по дате (новые сверху)
    this.receipts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    console.log('Initialized receipts:', this.receipts);
  }

  getReceipts(): Receipt[] {
    return [...this.receipts];
  }

  addReceipt(receipt: Receipt): void {
    this.receipts.unshift(receipt);
    console.log('Added receipt:', receipt);
  }

  updateReceipt(id: string, updatedData: Partial<Receipt>): void {
    const index = this.receipts.findIndex((receipt) => receipt.id === id);
    if (index !== -1) {
      this.receipts[index] = { ...this.receipts[index], ...updatedData };
      console.log('Updated receipt:', this.receipts[index]);
    }
  }

  deleteReceipt(id: string): void {
    const index = this.receipts.findIndex((receipt) => receipt.id === id);
    if (index !== -1) {
      const deleted = this.receipts.splice(index, 1)[0];
      console.log('Deleted receipt:', deleted);
    }
  }

  getReceiptById(id: string): Receipt | undefined {
    return this.receipts.find((receipt) => receipt.id === id);
  }
}
