import { ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanActivateAndLoadFn {
  canActivateFn: (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;

  canLoadFn: (
    route: Route,
    segments: UrlSegment[]
  ) => boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;
}
