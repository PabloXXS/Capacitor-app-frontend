import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonIcon,
  ModalController,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, mail, at } from 'ionicons/icons';

export interface EditProfileData {
  field: 'fullName' | 'publicNickname' | 'email';
  value: string;
  title: string;
  placeholder: string;
  icon: string;
}

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonIcon,
    IonButtons,
    FormsModule,
  ],
})
export class EditProfileModalComponent implements OnInit, AfterViewInit {
  @Input() data!: EditProfileData;
  @ViewChild('inputField', { static: false }) inputField!: IonInput;

  editedValue: string = '';

  constructor(private modalController: ModalController) {
    addIcons({
      person,
      mail,
      at,
    });
  }

  ngOnInit() {
    this.editedValue = this.data.value;
  }

  ngAfterViewInit() {
    // Автофокус на поле ввода с небольшой задержкой для анимации
    setTimeout(() => {
      this.inputField.setFocus();
    }, 300);
  }

  async cancel() {
    await this.modalController.dismiss(null, 'cancel');
  }

  async save() {
    const trimmedValue = this.editedValue.trim();
    if (trimmedValue) {
      console.log('Отправка данных из модального окна:', {
        field: this.data.field,
        value: trimmedValue,
      });
      await this.modalController.dismiss(
        {
          field: this.data.field,
          value: trimmedValue,
        },
        'save'
      );
    }
  }
}
