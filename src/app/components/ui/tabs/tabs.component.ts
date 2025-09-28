import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { receipt, camera, person } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterOutlet],
})
export class TabsComponent {
  constructor() {
    addIcons({
      receipt,
      camera,
      person,
    });
  }
}
