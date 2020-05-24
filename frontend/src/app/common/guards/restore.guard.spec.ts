// TODO: update later

describe('RestoreGuard', () => {

    /*
    const initialState: IAppState = initialAppState;
    const mockRouter: { navigate: any } = {
        navigate: jasmine.createSpy('navigate')
    };

    let httpMock: HttpTestingController;
    let restoreGuard: RestoreGuard;
    let authService: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RestoreGuard,
                UserService,
                AuthenticationService,
                { provide: AngularFirebaseAuthService, useValue: MOCK_AF_AUTH_SERVICE },
                { provide: Router, useValue: mockRouter },
                provideMockStore({ initialState })
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ]
        });

        httpMock = TestBed.inject(HttpTestingController);
        restoreGuard = TestBed.inject(RestoreGuard);
        authService = TestBed.inject(AuthenticationService);

    });

    it('should be created', () => {
        expect(restoreGuard).toBeTruthy();
    });

    it('should return true when user isn\'t in system', () => {
        expect(restoreGuard.canActivate()).toBeTruthy();
    });

    it('should return false when user is in system', () => {

        authService.login(MOCK_CREDS).subscribe();

        const loginReq: TestRequest = httpMock.expectOne(API_AUTH_LOGIN);
        loginReq.flush(MOCK_USER_AGENT, {
            headers: { 'x-token': MOCK_TOKEN }
        });
        expect(loginReq.request.method).toBe('POST');

        expect(restoreGuard.canActivate()).toBeFalsy();
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });
    */

});
