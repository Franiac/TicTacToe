import { Routes } from '@angular/router';
import { APP_TITLE } from '@app/app.globals';

export const END_ROUTES: Routes = [
  {
    path: '**',
    loadComponent: async () => (await import('./end.component')).EndComponent,
    title: 'End',
    data: {
      description: `${APP_TITLE} - End`
    }
  }
];
