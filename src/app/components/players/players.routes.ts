import { Routes } from '@angular/router';
import { APP_TITLE } from '@app/app.globals';

export const PLAYERS_ROUTES: Routes = [
  {
    path: '**',
    loadComponent: async () => (await import('./players.component')).PlayersComponent,
    title: 'Players',
    data: {
      description: `${APP_TITLE} - Players`
    }
  }
];
