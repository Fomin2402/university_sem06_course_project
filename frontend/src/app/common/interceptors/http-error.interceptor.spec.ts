// TODO: update later

/*
describe('HttpErrorInterceptor', () => {

    const initialState: IAppState = initialAppState;

    let httpMock: HttpTestingController;
    let httpErrorInterceptor: HttpErrorInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                UserService,
                HttpErrorInterceptor,
                AuthenticationService,
                HttpClientTestingModule,
                provideMockStore({ initialState }),
                { provide: AngularFirebaseAuthService, useValue: MOCK_AF_AUTH_SERVICE },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpErrorInterceptor,
                    multi: true,
                }
            ],
        });

        httpMock = TestBed.inject(HttpTestingController);
        httpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);

    });

    it('should create Interceptor', () => {
        expect(httpErrorInterceptor).toBeTruthy();
    });

    afterEach(() => {
        httpMock.verify();
    });

});
*/