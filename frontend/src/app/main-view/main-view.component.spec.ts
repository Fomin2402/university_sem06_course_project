// TODO: update later

/*
describe('MainViewComponent', () => {

    const initialState: IAppState = initialAppState;

    let store: MockStore<IAppState>;
    let component: MainViewComponent;
    let fixture: ComponentFixture<MainViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                RouterTestingModule,
                ImageCarouselModule,
                BrowserAnimationsModule,
                SpinnerModule,
                PipesModule
            ],
            declarations: [
                MainViewComponent,
                HeaderComponent,
                SidebarComponent,
                LoadingComponent
            ],
            providers: [
                provideMockStore({ initialState })
            ],
        })
            .compileComponents();

        store = TestBed.inject(Store) as MockStore<IAppState>;

        spyOn(store, 'dispatch').and.callThrough();

        fixture = TestBed.createComponent(MainViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create component and dispatch actions', () => {

        const profileAction: ProfileAction = new LoadProfile();
        const agencyAction: AgencyAction = new LoadAgency();

        expect(store.dispatch).toHaveBeenCalledWith(profileAction);
        expect(store.dispatch).toHaveBeenCalledWith(agencyAction);

        expect(component).toBeTruthy();
    });

});
*/
