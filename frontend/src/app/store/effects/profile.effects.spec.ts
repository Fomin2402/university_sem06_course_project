// TODO: update later

/*
describe('ProfileEffect', () => {

    let actions: ReplaySubject<any>;
    let profileEffect: ProfileEffect;
    let httpTestingController: HttpTestingController;
    let store: MockStore<IAppState>;

    const error: ErrorEvent = new ErrorEvent('req is fell down');
    const mockRouter: { navigate: any } = {
        navigate: jasmine.createSpy('navigate')
    };
    const initialState: IAppState = initialAppState;
    initialState.profileState = {
        ...profileInitialState,
        user: MOCK_USER_AGENT
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                ProfileEffect,
                provideMockActions(() => actions),
                provideMockStore({ initialState }),
                { provide: Router, useValue: mockRouter },
                { provide: AngularFirebaseAuthService, useValue: MOCK_AF_AUTH_SERVICE },
                AuthenticationService,
                UserService,
                CalendarIntegrationService,
                ToastService
            ],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        profileEffect = TestBed.inject(ProfileEffect);

        store = TestBed.inject(Store) as MockStore<IAppState>;
        spyOn(store, 'dispatch').and.callThrough();
    });

    it('should be created', () => {
        expect(profileEffect).toBeTruthy();
    });

    it('#login$ should dispatch LoginUserSuccess action with payload', () => {
        actions = new ReplaySubject(1);
        const payload: ILoginCredentials = MOCK_LOGIN_CREDENTIALS;
        const action: LoginUser = new LoginUser(payload);

        actions.next(action);

        profileEffect.login$.subscribe((result: ProfileAction) => {
            expect(_.isEqual((result as UpdateUserProfileSuccess).payload, MOCK_USER_AGENT)).toBeTruthy();
            expect(result.type).toEqual(ProfileActionTypes.LOGIN_USER_SUCCESS);
        });

        const testRequest: TestRequest = httpTestingController
            .expectOne(API_AUTH_LOGIN);

        expect(testRequest.request.method).toEqual('POST');

        testRequest.flush(
            MOCK_USER_AGENT,
            {
                headers: {
                    'x-token': MOCK_TOKEN
                }
            }
        );
    });

    it('#login$ should dispatch ErrorUserProfile action with payload', () => {
        actions = new ReplaySubject(1);
        const payload: ILoginCredentials = MOCK_LOGIN_CREDENTIALS;
        const action: LoginUser = new LoginUser(payload);

        actions.next(action);

        profileEffect.login$.subscribe((result: ProfileAction) => {
            expect((result as ErrorUserProfile).payload).toBeTruthy();
            expect(result.type).toEqual(ProfileActionTypes.ERROR_USER_PROFILE);
        });

        const testRequest: TestRequest = httpTestingController
            .expectOne(API_AUTH_LOGIN);

        expect(testRequest.request.method).toEqual('POST');

        testRequest.error(error);
    });

    it('#loadProfile$ should dispatch LoadProfileSuccess action with payload', () => {
        actions = new ReplaySubject(1);
        const action: LoadProfile = new LoadProfile();

        actions.next(action);

        profileEffect.loadProfile$.subscribe((result: ProfileAction) => {
            expect(_.isEqual((result as UpdateUserProfileSuccess).payload, MOCK_USER_AGENT)).toBeTruthy();
            expect(result.type).toEqual(ProfileActionTypes.GET_USER_PROFILE_SUCCESS);
        });

        const testRequest: TestRequest = httpTestingController
            .expectOne(API_USER_SELF);

        expect(testRequest.request.method).toEqual('GET');

        testRequest.flush(MOCK_USER_AGENT);
    });

    it('#loadProfile$ should dispatch ErrorUserProfile action with payload', () => {
        actions = new ReplaySubject(1);
        const action: LoadProfile = new LoadProfile();

        actions.next(action);

        profileEffect.loadProfile$.subscribe((result: ProfileAction) => {
            expect((result as ErrorUserProfile).payload).toBeTruthy();
            expect(result.type).toEqual(ProfileActionTypes.ERROR_USER_PROFILE);
        });

        const testRequest: TestRequest = httpTestingController
            .expectOne(API_USER_SELF);

        expect(testRequest.request.method).toEqual('GET');

        testRequest.error(error);
    });

    it('#updateUserProfile$ should dispatch UpdateUserProfileSuccess action with payload', () => {
        actions = new ReplaySubject(1);
        const payload: FormData = toFormData({payload: 'payload'});
        const action: UpdateUserProfile = new UpdateUserProfile(payload);

        actions.next(action);

        profileEffect.updateUserProfile$.subscribe((result: ProfileAction) => {
            expect(_.isEqual((result as UpdateUserProfileSuccess).payload, MOCK_USER_AGENT)).toBeTruthy();
            expect(result.type).toEqual(ProfileActionTypes.UPDATE_USER_PROFILE_SUCCESS);
        });

        const testRequest: TestRequest = httpTestingController
            .expectOne(API_USER_SELF);

        expect(testRequest.request.method).toEqual('PATCH');

        testRequest.flush(MOCK_USER_AGENT);
    });

    it('#updateUserProfile$ should dispatch ErrorUserProfile action with error', () => {
        actions = new ReplaySubject(1);
        const payload: FormData = toFormData({payload: 'payload'});
        const action: UpdateUserProfile = new UpdateUserProfile(payload);

        actions.next(action);

        profileEffect.updateUserProfile$.subscribe((result: ProfileAction) => {
            expect((result as ErrorUserProfile).payload).toBeTruthy();
            expect(result.type).toEqual(ProfileActionTypes.ERROR_USER_PROFILE);
        });

        const testRequest: TestRequest = httpTestingController
            .expectOne(API_USER_SELF);

        expect(testRequest.request.method).toEqual('PATCH');

        testRequest.error(error);
    });

    it('#checkCalendarSync should dispatch CheckCalendarSyncSuccess action with payload', () => {
        actions = new ReplaySubject(1);
        const action: CheckCalendarSync = new CheckCalendarSync();

        actions.next(action);

        profileEffect.checkCalendarSync.subscribe((result: ProfileAction) => {
            expect(_.isEqual((result as CheckCalendarSyncSuccess).payload, MOCK_CALENDAR_SYNC_STATUS)).toBeTruthy();
            expect(result.type).toEqual(ProfileActionTypes.CHECK_CALENDAR_SYNC_STATUS_SUCCESS);
        });

        const testRequest: TestRequest = httpTestingController
            .expectOne(API_GET_CALENDAR_INTEGRATION_STATUS_AND_OBTAIN_TOKEN);

        expect(testRequest.request.method).toEqual('GET');

        testRequest.flush(MOCK_CALENDAR_SYNC_STATUS);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

});
*/
