/* eslint-disable @typescript-eslint/unbound-method */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '@app/services/game.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ttt-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  imports: [
    ReactiveFormsModule
  ]
})
export class PlayersComponent {

  public readonly form: FormGroup;

  private readonly _router: Router;
  private readonly _gameService: GameService;

  public constructor(
    router: Router,
    formBuilder: FormBuilder,
    gameService: GameService
  ) {
    this.form = formBuilder.group({
      player1: [null, Validators.required],
      player2: [null, Validators.required]
    });

    this._router = router;
    this._gameService = gameService;
  }

  public async submitForm(): Promise<void> {
    if (this.form.valid) {
      const name1: string = this.form.controls['player1'].value as string;
      const name2: string = this.form.controls['player2'].value as string;

      this._gameService.run(name1, name2);

      await this._router.navigate(['game']);
    }
  }
}
