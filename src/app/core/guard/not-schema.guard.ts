import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HoppScotchService } from 'src/app/service/hoppscotch.service';

@Injectable({
  providedIn: 'root'
})
export class NotSchemaGuard implements CanActivate {

  constructor(
    private readonly hoppService: HoppScotchService,
    private readonly router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.hoppService.hoppColection$.pipe(
      map(schema => {
        if (schema !== undefined) {
          return this.router.parseUrl('/interpreter');
        }
        return true;
      })
    );
  }
}
