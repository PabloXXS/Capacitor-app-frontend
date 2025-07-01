import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { receipt, camera, settings } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon],
})
export class TabsComponent {
  constructor() {
    addIcons({
      receipt,
      camera,
      settings,
    });
  }
}
