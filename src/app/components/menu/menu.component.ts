import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '@app/services/game.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ttt-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  animations: [
    trigger('rotateAnim', [
      transition('void => *', [
        sequence([
          style({ scale: 0, transform: 'rotate(720deg)' }),
          animate('1.5s ease-in-out', style({ scale: 1, transform: 'none' })),
          animate('250ms ease-in-out', style({ transform: 'scaleY(0)' })),
          animate('250ms ease-in-out', style({ transform: 'none' })),
          animate('250ms ease-in-out', style({ transform: 'scaleX(0)' })),
          animate('250ms ease-in-out', style({ transform: 'none' }))
        ])
      ])
    ])
  ],
})
export class MenuComponent {

  private readonly _router: Router;
  private readonly _gameService: GameService;

  public constructor(
    router: Router,
    gameService: GameService
  ) {
    this._router = router;
    this._gameService = gameService;
  }

  public async startGame(): Promise<void> {
    this._gameService.reset();
    this._gameService.start();
    await this._router.navigate(['players']);
  }
}
