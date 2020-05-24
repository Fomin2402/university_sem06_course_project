import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SetPasswordGuard implements CanActivate {

    constructor() { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        return !!route.params.token;
    }

}
