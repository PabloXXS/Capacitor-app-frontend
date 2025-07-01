import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { receiptOutline } from 'ionicons/icons';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon],
})
export class ReceiptsComponent implements OnInit {
  constructor() {
    addIcons({
      receiptOutline,
    });
  }

  ngOnInit() {}
}
