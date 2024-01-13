import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private readonly _meta: Meta;

  public constructor(meta: Meta) {
    this._meta = meta;
  }

  public updateDescription(description: string | null): void {
    if (description == null) {
      return;
    }

    this._meta.updateTag({
      name: 'description',
      content: description
    });
  }
}
