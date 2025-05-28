import { Routes } from '@angular/router';
import { ScanComponent } from './components/scan/scan.component';
import { HistoryComponent } from './components/history/history.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'scan',
    pathMatch: 'full'
  },
  {
    path: 'scan',
    component: ScanComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  },
  {
    path: '**',
    redirectTo: 'scan'
  }
];
