// TODO: update later

/*
describe('Authentication Guard', () => {

    const initialState: IAppState = initialAppState;
    const mockRouter: { navigate: any } = {
        navigate: jasmine.createSpy('navigate')
    };

    let httpMock: HttpTestingController;
    let authGuard: AuthenticationGuard;
    let authService: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthenticationGuard,
                UserService,
                AuthenticationService,
                { provide: Router, useValue: mockRouter },
                provideMockStore({ initialState }),
                { provide: AngularFirebaseAuthService, useValue: MOCK_AF_AUTH_SERVICE }
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                StoreModule.forRoot(reducers)
            ]
        });

        httpMock = TestBed.inject(HttpTestingController);
        authGuard = TestBed.inject(AuthenticationGuard);
        authService = TestBed.inject(AuthenticationService);

    });

    it('should be created', () => {
        expect(authGuard).toBeTruthy();
    });

    it('should return false and navigate to \'/login\'', () => {
        expect(authGuard.canActivate(new ActivatedRouteSnapshot())).toBeFalsy();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should return true when user in system', () => {
        authService.login(MOCK_CREDS)
            .subscribe();

        const req: TestRequest = httpMock.expectOne(API_AUTH_LOGIN);
        expect(req.request.method).toBe('POST');
        req.flush(MOCK_USER_AGENT, {
            headers: { 'x-token': MOCK_TOKEN }
        });

        expect(authGuard.canActivate(new ActivatedRouteSnapshot())).toBeTruthy();
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

});
*/