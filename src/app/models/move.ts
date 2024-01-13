import { Player } from '@app/models/player';

export interface Move {
  fieldIndex: number;
  player: Player;
}
