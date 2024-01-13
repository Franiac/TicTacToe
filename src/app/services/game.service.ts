import { Injectable } from '@angular/core';
import { Move } from '@app/models/move';
import { Player } from '@app/models/player';
import { State } from '@app/models/state';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly WIN_CONDITIONS: Array<Array<number>> = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  private _state: State = State.Loaded;

  private _board: Array<Player | null> = [null, null, null, null, null, null, null, null, null];

  private _player1: Player | null = null;
  private _player2: Player | null = null;

  private readonly _currentPlayer$$: BehaviorSubject<Player | null>;
  private readonly _currentPlayer$: Observable<Player | null>;

  private readonly _moveMade$$: Subject<Move>;
  private readonly _moveMade$: Observable<Move>;

  private readonly _isFirstMove$$: Subject<boolean>;
  private readonly _isFirstMove$: Observable<boolean>;

  private readonly _isGameOver$$: Subject<void>;
  private readonly _isGameOver$: Observable<void>;

  private _winner: Player | null = null;

  public constructor() {
    this._currentPlayer$$ = new BehaviorSubject<Player | null>(null);
    this._currentPlayer$ = this._currentPlayer$$.asObservable();

    this._moveMade$$ = new Subject<Move>();
    this._moveMade$ = this._moveMade$$.asObservable();

    this._isFirstMove$$ = new BehaviorSubject<boolean>(true);
    this._isFirstMove$ = this._isFirstMove$$.asObservable();

    this._isGameOver$$ = new Subject<void>();
    this._isGameOver$ = this._isGameOver$$.asObservable();

    this.reset();
  }

  public start(): void {
    this._state = State.Started;
  }

  public run(name1: string, name2: string): void {
    this._state = State.Running;

    const beginner: boolean = Date.now() % 2 === 0;

    this._player1 = { id: !beginner, name: name1 };
    this._player2 = { id: beginner, name: name2 };

    this._currentPlayer$$.next(beginner ? this._player1 : this._player2);
  }

  public requestMove(fieldIndex: number): void {
    const player: Player | null = this._currentPlayer$$.value;

    if (player == null || this._board[fieldIndex] != null) {
      return;
    }

    this._board[fieldIndex] = player;

    this._isFirstMove$$.next(false);

    this._moveMade$$.next({
      fieldIndex,
      player
    });

    if (this.checkIsGameOver()) {
      this._isGameOver$$.next();
    } else {
      this.toggleCurrentPlayer();
    }
  }

  public toggleCurrentPlayer(): void {
    this._currentPlayer$$.next(this._currentPlayer$$.value === this._player1 ? this._player2 : this._player1)
  }

  public reset(): void {
    this._state = State.Loaded;
    this._winner = null;

    this._board = [null, null, null, null, null, null, null, null, null];

    this._currentPlayer$$.next(null);
    this._isFirstMove$$.next(true);

    this._player1 = null;
    this._player2 = null;
  }

  private checkIsGameOver(): boolean {
    for (const winCond of this.WIN_CONDITIONS) {
      if (this._board[winCond[0]]?.id === this._board[winCond[1]]?.id && this._board[winCond[0]]?.id === this._board[winCond[2]]?.id) {
        const player: Player | null = this._board[winCond[0]];

        if (player != null) {
          this._winner = player;
          this._state = State.Finished;
          return true;
        }
      }
    }

    const draw: boolean = this._board.every(p => p != null);

    if (draw) {
      this._state = State.Finished;
      return true;
    }

    return false;
  }

  public getState(): State {
    return this._state;
  }

  public getIsFirstMove(): Observable<boolean> {
    return this._isFirstMove$;
  }

  public getMoveMade(): Observable<Move> {
    return this._moveMade$;
  }

  public getCurrentPlayer(): Observable<Player | null> {
    return this._currentPlayer$;
  }

  public getIsGameOver(): Observable<void> {
    return this._isGameOver$;
  }

  public getWinner(): Player | null {
    return this._winner;
  }
}
