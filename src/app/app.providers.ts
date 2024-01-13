import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EnvironmentProviders, Provider, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleStrategy, provideRouter } from '@angular/router';
import { APP_ROUTES } from '@app/app.routes';
import { AppTitleStrategy } from '@app/app.title.strategy';


export const APP_PROVIDERS: Array<EnvironmentProviders | Provider> = [
  provideRouter(APP_ROUTES),
  importProvidersFrom(
    BrowserAnimationsModule
  ),
  {
    provide: TitleStrategy,
    useClass: AppTitleStrategy
  },
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }
];
