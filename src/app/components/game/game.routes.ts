import { Routes } from '@angular/router';
import { APP_TITLE } from '@app/app.globals';

export const GAME_ROUTES: Routes = [
  {
    path: '**',
    loadComponent: async () => (await import('./game.component')).GameComponent,
    title: 'Game',
    data: {
      description: `${APP_TITLE} - Game`
    }
  }
];
