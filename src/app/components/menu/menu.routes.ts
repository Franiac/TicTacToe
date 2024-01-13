import { Routes } from '@angular/router';
import { APP_TITLE } from '@app/app.globals';

export const MENU_ROUTES: Routes = [
  {
    path: '**',
    loadComponent: async () => (await import('./menu.component')).MenuComponent,
    title: 'Menu',
    data: {
      description: `${APP_TITLE} - Menu`
    }
  }
];
