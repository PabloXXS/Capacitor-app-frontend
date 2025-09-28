import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonFab,
  IonFabButton,
  IonSearchbar,
  ActionSheetController,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  receiptOutline,
  ellipsisVerticalOutline,
  add,
  createOutline,
  trashOutline,
  searchOutline,
} from 'ionicons/icons';
import { ReceiptService, Receipt } from '../../services/receipt.service';
import { CurrencyPipe, DateFormatPipe } from '../../pipes';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonFab,
    IonFabButton,
    IonSearchbar,
    CurrencyPipe,
    DateFormatPipe,
  ],
})
export class ReceiptsComponent implements OnInit {
  receipts: Receipt[] = [];
  filteredReceipts: Receipt[] = [];
  searchTerm: string = '';

  constructor(
    private receiptService: ReceiptService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) {
    addIcons({
      receiptOutline,
      ellipsisVerticalOutline,
      add,
      createOutline,
      trashOutline,
      searchOutline,
    });
  }

  ngOnInit() {
    this.loadReceipts();
  }

  loadReceipts() {
    this.receipts = this.receiptService.getReceipts();
    this.filterReceipts();
    console.log('Loaded receipts:', this.receipts);
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterReceipts();
  }

  filterReceipts() {
    if (!this.searchTerm) {
      this.filteredReceipts = [...this.receipts];
    } else {
      this.filteredReceipts = this.receipts.filter((receipt) =>
        receipt.title.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  async presentActionSheet(receipt: Receipt) {
    const actionSheet = await this.actionSheetController.create({
      header: receipt.title,
      buttons: [
        {
          text: 'Изменить',
          icon: 'create-outline',
          handler: () => {
            this.editReceipt(receipt);
          },
        },
        {
          text: 'Удалить',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.deleteReceipt(receipt);
          },
        },
        {
          text: 'Отмена',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async editReceipt(receipt: Receipt) {
    const alert = await this.alertController.create({
      header: 'Изменить чек',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Название магазина',
          value: receipt.title,
        },
        {
          name: 'summ',
          type: 'number',
          placeholder: 'Сумма',
          value: receipt.summ,
        },
      ],
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
        },
        {
          text: 'Сохранить',
          handler: (data) => {
            if (data.title && data.summ) {
              this.receiptService.updateReceipt(receipt.id, {
                title: data.title,
                summ: parseFloat(data.summ),
              });
              this.loadReceipts();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteReceipt(receipt: Receipt) {
    const alert = await this.alertController.create({
      header: 'Удалить чек',
      message: `Вы уверены, что хотите удалить чек из "${receipt.title}"?`,
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
        },
        {
          text: 'Удалить',
          role: 'destructive',
          handler: () => {
            this.receiptService.deleteReceipt(receipt.id);
            this.loadReceipts();
          },
        },
      ],
    });
    await alert.present();
  }

  async addNewReceipt() {
    const alert = await this.alertController.create({
      header: 'Добавить чек',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Название магазина',
        },
        {
          name: 'summ',
          type: 'number',
          placeholder: 'Сумма',
        },
      ],
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
        },
        {
          text: 'Добавить',
          handler: (data) => {
            if (data.title && data.summ) {
              const newReceipt: Receipt = {
                id: Date.now().toString(),
                title: data.title,
                summ: parseFloat(data.summ),
                image: 'assets/sample-check.png',
                date: new Date(),
              };
              this.receiptService.addReceipt(newReceipt);
              this.loadReceipts();
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
