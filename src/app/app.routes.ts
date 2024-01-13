import { inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { END_ROUTES } from '@app/components/end/end.routes';
import { GAME_ROUTES } from '@app/components/game/game.routes';
import { MENU_ROUTES } from '@app/components/menu/menu.routes';
import { PLAYERS_ROUTES } from '@app/components/players/players.routes';
import { State } from '@app/models/state';
import { GameService } from '@app/services/game.service';

const canActivatePlayers: CanActivateFn = () => inject(GameService).getState() === State.Started;
const canActivateGame: CanActivateFn = () => inject(GameService).getState() === State.Running;
const canActivateEnd: CanActivateFn = () => inject(GameService).getState() === State.Finished;

export const APP_ROUTES: Routes = [
  {
    path: 'players',
    children: PLAYERS_ROUTES,
    canActivate: [canActivatePlayers]
  },
  {
    path: 'game',
    children: GAME_ROUTES,
    canActivate: [canActivateGame]
  },
  {
    path: 'end',
    children: END_ROUTES,
    canActivate: [canActivateEnd]
  },
  {
    path: '**',
    children: MENU_ROUTES
  }
];
