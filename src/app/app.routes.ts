import { Routes } from '@angular/router';
import { TabsComponent } from './components/ui/tabs/tabs.component';

export const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        redirectTo: 'camera',
        pathMatch: 'full',
      },
      {
        path: 'receipts',
        loadComponent: () =>
          import('./components/receipts/receipts.component').then(
            (m) => m.ReceiptsComponent
          ),
      },
      {
        path: 'camera',
        loadComponent: () =>
          import('./components/camera/camera.component').then(
            (m) => m.CameraComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./components/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
