// TODO: update later

/*
describe('AdminGuard', () => {

    let store: MockStore<IAppState>;
    let guard: AdminGuard;
    let mockRouter!: any;

    const is_master_agent: boolean = true;
    const initialState: IAppState = {
        ...initialAppState,
        profileState: {
            ...initialAppState.profileState,
            user: {
                ...MOCK_USER_AGENT,
                is_master_agent
            }
        }
    };
    const isNotMasterAgentState: IAppState = {
        ...initialState,
        profileState: {
            ...initialAppState.profileState,
            user: {
                ...MOCK_USER_AGENT,
                is_master_agent: false
            }
        }
    };

    beforeEach(() => {
        mockRouter = {
            createUrlTree: jasmine.createSpy('createUrlTree')
        };

        TestBed.configureTestingModule({
            providers: [
                AdminGuard,
                provideMockStore({ initialState }),
                { provide: Router, useValue: mockRouter },
            ],
            imports: [
                RouterTestingModule
            ]
        }).compileComponents();

        store = TestBed.inject(Store) as MockStore<IAppState>;
        guard = TestBed.inject(AdminGuard);

    });

    it('should create', () => {
        expect(guard).toBeTruthy();
        store
            .pipe(
                select(getIsUserSuperAgent)
            )
            .subscribe((res: boolean) => expect(res).toEqual(is_master_agent));
    });

    it('canActivate should return true when user isn master agent', () => {
        expect(guard.canActivate()).toBeTruthy();
    });

    it('canActivate should return true when user is master agent', () => {
        expect(guard.canActivateChild()).toBeTruthy();
    });

    it('canActivate should return UrlTree to navigate to "/" when user isn\'t master agent', () => {
        store.setState(isNotMasterAgentState);
        guard.canActivate().subscribe(() => {
            expect(mockRouter.createUrlTree).toHaveBeenCalledTimes(1);
            expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/']);
        });
    });

    it('canActivateChild should return UrlTree to navigate to "/" when user isn\'t master agent', () => {
        store.setState(isNotMasterAgentState);
        guard.canActivate().subscribe(() => {
            expect(mockRouter.createUrlTree).toHaveBeenCalledTimes(1);
            expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/']);
        });
    });

});
*/