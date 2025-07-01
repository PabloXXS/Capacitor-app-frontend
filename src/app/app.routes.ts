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
        path: 'profile',
        loadComponent: () =>
          import('./components/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
