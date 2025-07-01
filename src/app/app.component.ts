import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      // Установка высоты для корректного отображения на iOS
      if (this.platform.is('ios')) {
        document.documentElement.style.setProperty(
          '--ion-safe-area-top',
          'env(safe-area-inset-top)'
        );
        document.documentElement.style.setProperty(
          '--ion-safe-area-bottom',
          'env(safe-area-inset-bottom)'
        );
      }
    });
  }
}
