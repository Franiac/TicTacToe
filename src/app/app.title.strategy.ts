import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { APP_TITLE } from '@app/app.globals';

@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {

  private readonly _title: Title;

  public constructor(title: Title) {
    super();
    this._title = title;
  }

  public updateTitle(snapshot: RouterStateSnapshot): void {
    const title: string | undefined = this.buildTitle(snapshot);

    if (title != null) {
      this._title.setTitle(`${APP_TITLE} - ${title}`);
    } else {
      this._title.setTitle(APP_TITLE);
    }
  }
}
