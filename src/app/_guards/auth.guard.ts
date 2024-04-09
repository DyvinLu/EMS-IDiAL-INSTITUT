import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { iif, of, Observable, concatMap } from 'rxjs';
import { map } from 'rxjs/operators';

//import { AuthService } from '../ludyServices/auth.service';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authS: AuthService
  ) {}

  /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.authS.isLogin() === false){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }*/

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authS.isAuthenticated$.pipe(
      concatMap((result) =>
        iif(
          () => result,
          of(true),
          this.authS.loginWithRedirect().pipe(map((_) => false))
        )
      )
    );
  }
}
