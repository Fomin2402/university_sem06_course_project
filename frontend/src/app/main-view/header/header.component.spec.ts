// TODO: update later

/*
describe('HeaderComponent', () => {

    const initialState: IAppState = initialAppState;
    initialState.profileState = {
        ...profileInitialState,
        user: MOCK_USER_AGENT
    };

    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let store: MockStore<IAppState>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                PipesModule
            ],
            providers: [
                provideMockStore({ initialState })
            ],
            declarations: [HeaderComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store) as MockStore<IAppState>;

        spyOn(store, 'dispatch').and.callThrough();

        fixture.detectChanges();

    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init userPhoto value', () => {
        expect(component.userPhoto).toEqual(MOCK_USER_AGENT.photo ? MOCK_USER_AGENT.photo.thumbnail : null);
    });

    it('should dispatch Logout action', () => {
        component.logout();

        const action: Action = new LogoutUser();
        expect(store.dispatch).toHaveBeenCalledWith(action);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem(TOKEN_SYMBOL)).toBeNull();
    });

});
*/
