import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { SeoService } from '@app/services/seo.service';
import { Subscription, filter, map, mergeMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'ttt-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly _router: Router;
  private readonly _activatedRoute: ActivatedRoute;
  private readonly _seoService: SeoService;

  private _navigationSub: Subscription | null = null;

  public constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    seoService: SeoService
  ) {
    this._router = router;
    this._activatedRoute = activatedRoute;
    this._seoService = seoService;
  }

  public ngOnInit(): void {
    this._navigationSub = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this._activatedRoute),
      map(activatedRoute => {
        let route: ActivatedRoute = activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      this._seoService.updateDescription(data['description'] as string | null);
    });
  }

  public ngOnDestroy(): void {
    this._navigationSub?.unsubscribe();
  }
}
