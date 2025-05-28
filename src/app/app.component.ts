import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, IonicModule],
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
      
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="scan" routerLink="/scan" routerLinkActive="selected">
          <ion-icon name="camera-outline"></ion-icon>
          <ion-label>Scan</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="history" routerLink="/history" routerLinkActive="selected">
          <ion-icon name="list-outline"></ion-icon>
          <ion-label>History</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="statistics" routerLink="/statistics" routerLinkActive="selected">
          <ion-icon name="stats-chart-outline"></ion-icon>
          <ion-label>Statistics</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-app>
  `,
  styles: [`
    ion-tab-bar {
      --background: var(--ion-color-light);
      --border: none;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    }

    ion-tab-button {
      --color: var(--ion-color-medium);
      --color-selected: var(--ion-color-primary);
    }

    ion-tab-button.selected {
      --color: var(--ion-color-primary);
    }

    @media (prefers-color-scheme: dark) {
      ion-tab-bar {
        --background: var(--ion-color-dark);
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
      }
    }
  `]
})
export class AppComponent {
  title = 'Receipt Scanner';
}
