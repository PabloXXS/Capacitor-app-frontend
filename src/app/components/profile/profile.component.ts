import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonToggle,
  IonIcon,
  IonAvatar,
  ModalController,
} from '@ionic/angular/standalone';
import { EditProfileModalComponent, type EditProfileData } from '../../modals';
import { addIcons } from 'ionicons';
import {
  person,
  chevronForward,
  notifications,
  language,
  moon,
  mail,
  at,
} from 'ionicons/icons';

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
    IonToggle,
    IonIcon,
    IonAvatar,
  ],
})
export class ProfileComponent implements OnInit {
  userProfile = {
    displayName: 'Паша',
    fullName: 'Павел Подошевко',
    publicNickname: 'Паша',
    email: 'pablovins@mail.ru',
    avatar: '',
  };

  settings = {
    notifications: true,
    language: 'русский',
    darkMode: 'вкл',
  };

  constructor(
    private modalController: ModalController,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    addIcons({
      person,
      chevronForward,
      notifications,
      language,
      moon,
      mail,
      at,
    });
  }

  ngOnInit() {}

  onNotificationToggle(event: any) {
    this.settings.notifications = event.detail.checked;
    console.log('Уведомления:', this.settings.notifications);
  }

  async editProfile(field: 'fullName' | 'publicNickname' | 'email') {
    const editData: EditProfileData = this.getEditData(field);

    const modal = await this.modalController.create({
      component: EditProfileModalComponent,
      componentProps: {
        data: editData,
      },
      breakpoints: [0, 0.3, 0.6, 1],
      initialBreakpoint: 0.3,
      handle: true,
      backdropDismiss: true,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'save' && data) {
      console.log('Сохранение данных:', data);
      this.updateProfileField(data.field, data.value);
      this.changeDetectorRef.detectChanges();
    }
  }

  private getEditData(
    field: 'fullName' | 'publicNickname' | 'email'
  ): EditProfileData {
    switch (field) {
      case 'fullName':
        return {
          field: 'fullName',
          value: this.userProfile.fullName,
          title: 'изменить имя',
          placeholder: 'Введите полное имя',
          icon: 'person',
        };
      case 'publicNickname':
        return {
          field: 'publicNickname',
          value: this.userProfile.publicNickname,
          title: 'изменить никнейм',
          placeholder: 'Введите публичный никнейм',
          icon: 'at',
        };
      case 'email':
        return {
          field: 'email',
          value: this.userProfile.email,
          title: 'изменить email',
          placeholder: 'Введите email адрес',
          icon: 'mail',
        };
    }
  }

  private updateProfileField(field: string, value: string) {
    switch (field) {
      case 'fullName':
        this.userProfile.fullName = value;
        break;
      case 'publicNickname':
        this.userProfile.publicNickname = value;
        this.userProfile.displayName = value; // Обновляем отображаемое имя
        break;
      case 'email':
        this.userProfile.email = value;
        break;
    }
    console.log(`Обновлено поле ${field}:`, value);
  }

  openLanguageSettings() {
    console.log('Открытие настроек языка');
    // Здесь будет логика выбора языка
  }

  openThemeSettings() {
    console.log('Открытие настроек темы');
    // Здесь будет логика выбора темы
  }
}
