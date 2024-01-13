import { ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FieldComponent } from '@app/components/field/field.component';
import { Move } from '@app/models/move';
import { GameService } from '@app/services/game.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ttt-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  imports: [
    FieldComponent
  ]
})
export class BoardComponent implements OnInit {

  @ViewChildren(FieldComponent)
  public fields: QueryList<FieldComponent> | null = null;

  private readonly _gameService: GameService;

  private _moveMadeSub: Subscription | null = null;

  public constructor(gameService: GameService) {
    this._gameService = gameService;
  }

  public ngOnInit(): void {
    this._moveMadeSub = this._gameService.getMoveMade().subscribe({
      next: this.moveMade.bind(this)
    });
  }

  private moveMade(move: Move): void {
    if (this.fields == null) {
      return;
    }

    const field: FieldComponent | undefined = this.fields.get(move.fieldIndex);

    if (field == null) {
      return;
    }

    field.player = move.player;
  }

  public moveRequested(fieldIndex: number): void {
    this._gameService.requestMove(fieldIndex);
  }
}
