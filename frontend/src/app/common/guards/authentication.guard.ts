import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { getUserProfile } from 'src/app/store/selectors/profile.selectors';
import { AuthenticationService } from '../services/authentication.service';
import { LoadProfile } from 'src/app/store/actions';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private auth: AuthenticationService,
        private store: Store<IAppState>
    ) { }

    canLoad(): Observable<boolean> |boolean {
        console.log('AuthenticationGuard CanLoad');
        return this.checkAuth();
    }

    canActivate(_route: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.checkAuth(state ? state.url : '');
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state);
    }

    private checkAuth(url: string = 'null'): Observable<boolean> | boolean {
        if (this.auth.isAuthenticated) {
            return this.store.pipe(
                select(getUserProfile),
                first(),
                map((user: IUser | null) => {
                    if (!user) {
                        this.store.dispatch(new LoadProfile());
                    }

                    return true;
                })
            );
        }

        this.auth.returnUrl = url;
        this.auth.redirectToLoginPage();
        return false;
    }
}
