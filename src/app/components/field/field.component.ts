import { trigger, transition, sequence, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '@app/models/player';
import { PlayerNamePipe } from '@app/pipes/player-name.pipe';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ttt-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  imports: [
    CommonModule,
    PlayerNamePipe
  ],
  animations: [
    trigger('iconAnim', [
      transition('void => *', [
        sequence([
          style({ scale: 0 }),
          animate('500ms ease-in-out', style({ scale: 1.3 })),
          animate('150ms ease-in-out', style({ scale: 1 }))
        ])
      ])
    ])
  ],
})
export class FieldComponent {

  @Input()
  public fieldIndex: number = 0;

  @Output()
  public readonly moveRequested: EventEmitter<number> = new EventEmitter<number>();

  public player: Player | null = null;

  private readonly _cdr: ChangeDetectorRef;

  public constructor(cdr: ChangeDetectorRef) {
    this._cdr = cdr;
  }

  public requestMove(): void {
    this.moveRequested.emit(this.fieldIndex)
  }

  public setPlayer(player: Player): void {
    this.player = player;
    this._cdr.markForCheck();
  }
}
