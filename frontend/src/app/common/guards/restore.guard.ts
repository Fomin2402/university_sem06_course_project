import { CanActivate, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services';

@Injectable()
export class RestoreGuard implements CanActivate, CanActivateChild {

    constructor(private auth: AuthenticationService) { }

    canActivate(): boolean {
        return this.checkAuth();
    }

    canActivateChild(): boolean {
        return this.canActivate();
    }

    private checkAuth(): boolean {
        if (this.auth.isAuthenticated) {
            this.auth.redirectToMainPage();
            return false;
        }
        return true;
    }

}
