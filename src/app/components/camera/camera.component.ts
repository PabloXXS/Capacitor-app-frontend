import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon],
})
export class CameraComponent implements OnInit {
  constructor() {
    addIcons({
      camera,
    });
  }

  ngOnInit() {}

  openCamera() {
    // Логика для открытия камеры будет здесь
    console.log('Открытие камеры для сканирования чека');
  }
}
