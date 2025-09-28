import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { ReceiptService, Receipt } from '../../services/receipt.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon],
})
export class CameraComponent implements OnInit {
  constructor(
    private receiptService: ReceiptService,
    private toastController: ToastController
  ) {
    addIcons({
      camera,
    });
  }

  ngOnInit() {}

  async openCamera() {
    try {
      // TODO: Implement actual camera functionality with Capacitor Camera plugin
      // For now, create a mock receipt
      const mockReceipt: Receipt = {
        id: Date.now().toString(),
        title: 'Сканированный чек',
        summ: Math.floor(Math.random() * 3000) + 200,
        image: 'assets/sample-check.png',
        date: new Date(),
      };

      this.receiptService.addReceipt(mockReceipt);
      await this.presentToast('Чек успешно добавлен!');
    } catch (error) {
      console.error('Error opening camera:', error);
      await this.presentToast('Ошибка при сканировании чека');
    }
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
