import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardComponent } from '@app/components/board/board.component';
import { Player } from '@app/models/player';
import { GameService } from '@app/services/game.service';
import { Observable, Subscription, mergeMap } from 'rxjs';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ttt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [
    BoardComponent,
    CommonModule
  ],
})
export class GameComponent implements OnInit, OnDestroy {

  public isFirstMove$: Observable<boolean> | null = null;
  public currentPlayer$: Observable<Player | null> | null = null;

  private _isGameOverSub: Subscription | null = null;

  private readonly _router: Router;
  private readonly _gameService: GameService;

  public constructor(
    router: Router,
    gameService: GameService
  ) {
    this._router = router;
    this._gameService = gameService;
  }

  public ngOnInit(): void {
    this.isFirstMove$ = this._gameService.getIsFirstMove();
    this.currentPlayer$ = this._gameService.getCurrentPlayer();

    this._isGameOverSub = this._gameService.getIsGameOver().pipe(
      mergeMap(async () => this.gameOver())
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this._isGameOverSub?.unsubscribe();
  }

  private async gameOver(): Promise<void> {
    await this._router.navigate(['end']);
  }
}
