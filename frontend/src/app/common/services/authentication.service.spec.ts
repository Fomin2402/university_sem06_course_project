import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AngularFirebaseAuthService } from 'src/app/modules/chat-sdk/chat-services';
import { AuthenticationService } from './authentication.service';
import { API_AUTH_LOGIN } from '../api-routes';
import { reducers } from 'src/app/store';
import {
    MOCK_AF_AUTH_SERVICE,
    MOCK_CREDS,
    MOCK_TOKEN,
    MOCK_USER_AGENT
} from '../mocks';
import { UserService } from './user.service';

describe('Authentication Service', () => {

    const mockRouter: { navigate: any } = {
        navigate: jasmine.createSpy('navigate')
    };

    let service: AuthenticationService;
    let httpMock: HttpTestingController;
    let store: Store<IAppState>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                StoreModule.forRoot(reducers)
            ],
            providers: [
                UserService,
                AuthenticationService,
                { provide: AngularFirebaseAuthService, useValue: MOCK_AF_AUTH_SERVICE },
                { provide: Router, useValue: mockRouter }
            ]
        });

        service = TestBed.inject(AuthenticationService);
        httpMock = TestBed.inject(HttpTestingController);

        store = TestBed.inject(Store);

        spyOn(store, 'dispatch').and.callThrough();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return null cuase token is absent', () => {
        expect(service.token).toBeNull();
    });

    it('should return token', () => {
        service.login(MOCK_CREDS)
            .subscribe();

        const req: TestRequest = httpMock.expectOne(API_AUTH_LOGIN);
        expect(req.request.method).toBe('POST');
        req.flush(MOCK_USER_AGENT, {
            headers: { 'x-token': MOCK_TOKEN }
        });

        expect(service.token).toEqual(MOCK_TOKEN);
    });

    it('shouldn\'t authorize a user without headers', () => {
        service.login(MOCK_CREDS)
            .pipe(
                catchError((err: Error) => {
                    expect(err).toBeTruthy();
                    return of(null);
                })
            )
            .subscribe((res: IUser | null) => {
                expect(res).toBeNull();
            });

        const req: TestRequest = httpMock.expectOne(API_AUTH_LOGIN);
        expect(req.request.method).toBe('POST');
        req.flush(MOCK_USER_AGENT);
    });

    it('should authorize a user and navigate to \'/\' url', () => {
        service.login(MOCK_CREDS)
            .subscribe((res: IUser) => {
                expect(res).toEqual(MOCK_USER_AGENT);
                expect(service.isAuthenticated).toBeTruthy();
            });

        const req: TestRequest = httpMock.expectOne(API_AUTH_LOGIN);
        expect(req.request.method).toBe('POST');
        req.flush(MOCK_USER_AGENT, {
            headers: { 'x-token': MOCK_TOKEN }
        });

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('login() while server is down', () => {
        const data: string = 'Internal server error';
        service.login(MOCK_CREDS)
            .pipe(
                catchError((err: Error) => {
                    expect(err).toBeTruthy();
                    return of(null);
                })
            )
            .subscribe((res: IUser | null) => {
                expect(res).toBeNull();
            });
        const req: TestRequest = httpMock.expectOne(API_AUTH_LOGIN);
        req.flush(data, {
            status: 500,
            statusText: 'Internal server error'
        });
        expect(req.request.method).toBe('POST');
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

});
