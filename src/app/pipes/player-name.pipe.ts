import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'playerName'
})
export class PlayerNamePipe implements PipeTransform {
  public transform(value: boolean): string {
    return value ? 'O' : 'X';
  }
}
