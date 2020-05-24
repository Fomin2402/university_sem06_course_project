import { ActivatedRouteSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { SetPasswordGuard } from './set-password.guard';

describe('SetPasswordGuard', () => {

    let setPasswordGuard: SetPasswordGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SetPasswordGuard
            ]
        });

        setPasswordGuard = TestBed.inject(SetPasswordGuard);

    });

    it('should be created', () => {
        expect(setPasswordGuard).toBeTruthy();
    });

    it('should return true', () => {
        const token: string = 'token';
        const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        route.params = {};
        route.params.token = token;

        expect(setPasswordGuard.canActivate(route)).toBeTruthy();
    });

    it('should return false', () => {
        const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        route.params = {};

        expect(setPasswordGuard.canActivate(route)).toBeFalsy();
    });

});
