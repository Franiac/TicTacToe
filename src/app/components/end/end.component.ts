import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '@app/models/player';
import { GameService } from '@app/services/game.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ttt-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss'],
  imports: [
    CommonModule
  ]
})
export class EndComponent {

  public winner: Player | null = null;

  private readonly _router: Router;
  private readonly _gameService: GameService;


  public constructor(
    router: Router,
    gameService: GameService
  ) {
    this._router = router;
    this._gameService = gameService;
    this.winner = this._gameService.getWinner();
  }

  public async newGame(): Promise<void> {
    this._gameService.reset();
    await this._router.navigate(['/']);
  }
}
