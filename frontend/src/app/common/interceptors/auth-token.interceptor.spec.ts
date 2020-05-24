// TODO: update later

/*
describe('AuthTokenInterceptor', () => {

    let httpMock: HttpTestingController;
    let authService: AuthenticationService;
    let userService: UserService;
    let http: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                StoreModule.forRoot(reducers)
            ],
            providers: [
                AuthenticationService,
                { provide: AngularFirebaseAuthService, useValue: MOCK_AF_AUTH_SERVICE },
                UserService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthTokenInterceptor,
                    multi: true
                }
            ],
        });

        httpMock = TestBed.inject(HttpTestingController);
        http = TestBed.inject(HttpClient);
        authService = TestBed.inject(AuthenticationService);
        userService = TestBed.inject(UserService);
    });

    it('shouldn\'t add token to request cause token is absent', async () => {
        const deferred: Q.Deferred<void> = Q.defer();

        userService.updateSelfUserProfile(MOCK_UPDATEBLE_USER)
            .subscribe((res: IUser) => {
                expect(res).toEqual(MOCK_USER_AGENT);
                deferred.resolve();
            });

        const testRequest: TestRequest = httpMock.expectOne(`${API_USER_SELF}`);
        testRequest.flush(MOCK_USER_AGENT);

        expect(testRequest.request.headers.has('Authorization')).toBeFalsy();
        expect(testRequest.request.headers.get('Authorization')).toBeNull();

        await deferred.promise;
    });

    it('should add token to request', async() => {
        const waitForLogin: Q.Deferred<void> = Q.defer();
        const waitForupdateSelfUserProfile: Q.Deferred<void> = Q.defer();

        authService.login(MOCK_CREDS).subscribe((response: IUser) => {
            expect(response).toEqual(MOCK_USER_AGENT);
            waitForLogin.resolve();
        });

        const loginReq: TestRequest = httpMock.expectOne(`${API_AUTH_LOGIN}`);
        loginReq.flush(
            MOCK_USER_AGENT,
            {
                headers: {
                    'x-token': MOCK_TOKEN
                }
            }
        );

        await waitForLogin.promise;
        expect(loginReq.request.headers.has('Authorization')).toBeFalsy();
        expect(loginReq.request.method).toEqual('POST');

        userService.updateSelfUserProfile(MOCK_UPDATEBLE_USER)
            .subscribe((res: IUser) => {
                expect(res).toEqual(MOCK_USER_AGENT);
                waitForupdateSelfUserProfile.resolve();
            });

        const testRequest: TestRequest = httpMock.expectOne(`${API_USER_SELF}`);
        testRequest.flush(MOCK_USER_AGENT);

        await waitForupdateSelfUserProfile.promise;

        expect(testRequest.request.headers.has('Authorization')).toBeTruthy();
        expect(testRequest.request.headers.get('Authorization')).toEqual(`Token ${MOCK_TOKEN}`);
        expect(testRequest.request.method).toEqual('PATCH');

    });

    it('shouldn\'t add token to request cause it\'s not available some routes', () => {

        http.get<any>(API_MEDIA).subscribe();

        const testRequest: TestRequest = httpMock.expectOne(`${API_MEDIA}`);
        testRequest.flush(MOCK_USER_AGENT);
        expect(testRequest.request.headers.has('Authorization')).toBeFalsy();
        expect(testRequest.request.headers.get('Authorization')).toBeNull();
        expect(testRequest.request.method).toEqual('GET');
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    afterAll(() => {
        localStorage.clear();
    });

});
*/