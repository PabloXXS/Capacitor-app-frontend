import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
  ],
})
export class SettingsComponent implements OnInit {
  settings = {
    notifications: true,
    autoSave: false,
    darkMode: false,
  };

  constructor() {}

  ngOnInit() {}

  onSettingChange(setting: string, event: any) {
    (this.settings as any)[setting] = event.detail.checked;
    console.log(`Настройка ${setting} изменена на: ${event.detail.checked}`);
  }
}
