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
  IonIcon,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, settings, notifications, save, moon } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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
    IonIcon,
    IonCard,
    IonCardContent,
  ],
})
export class ProfileComponent implements OnInit {
  userProfile = {
    name: 'Пользователь',
    email: 'user@example.com',
    avatar: '',
  };

  settings = {
    notifications: true,
    autoSave: false,
    darkMode: false,
  };

  constructor() {
    addIcons({
      person,
      settings,
      notifications,
      save,
      moon,
    });
  }

  ngOnInit() {}

  onSettingChange(setting: string, event: any) {
    (this.settings as any)[setting] = event.detail.checked;
    console.log(`Настройка ${setting} изменена на: ${event.detail.checked}`);
  }
}
