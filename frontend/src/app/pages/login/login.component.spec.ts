import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { initialAppState } from 'src/app/store/reducers';
import { LoginComponent } from './login.component';
import { LoginUser } from 'src/app/store/actions';
import {
    MOCK_AGENCY,
    MOCK_CREDS,
    MOCK_EMAIL,
    MOCK_PASSWORD
} from 'src/app/common';

describe('Login Component', () => {

    const initialState: IAppState = {
        ...initialAppState
    };

    let store: MockStore<IAppState>;
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [LoginComponent],
                imports: [
                    ReactiveFormsModule,
                    RouterTestingModule,
                    HttpClientTestingModule
                ],
                providers: [
                    provideMockStore({ initialState }),
                    {
                        provide: ActivatedRoute,
                        useValue: {
                            snapshot: {
                                data: {
                                    agency: MOCK_AGENCY
                                }
                            }
                        }
                    }
                ]
            }).compileComponents();

            store = TestBed.inject(Store) as MockStore<IAppState>;

            spyOn(store, 'dispatch').and.callThrough();

            fixture = TestBed.createComponent(LoginComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

        })
    );

    it('should created', () => {
        expect(component).toBeTruthy();
    });

    it('password field should be of \'text\' type', () => {
        component.switchDisplayingPassword();
        expect(component.showPass).toBeTruthy();
        fixture.detectChanges();

        const passInput: any = [...document.getElementsByTagName('input') as any]
            .find((item: any) => item.name === 'password');

        expect(passInput.type).toEqual('text');
    });

    it('password field should be of \'pass\' type', () => {
        expect(component.showPass).toBeFalsy();

        const passInput: any = [...document.getElementsByTagName('input') as any]
            .find((item: any) => item.name === 'password');

        expect(passInput.type).toEqual('password');
    });

    it('email should be existed', () => {
        expect(component.email).toBeTruthy();
    });

    it('password should be existed', () => {
        expect(component.password).toBeTruthy();
    });

    it('email field of form should be invalid', () => {
        component.loginForm.markAsTouched();
        component.email.setValue('qwerty');
        fixture.detectChanges();
        expect(component.email.status).toEqual('INVALID');
    });

    it('password field of form should be invalid', () => {
        component.loginForm.markAsTouched();
        component.password.setValue('');
        fixture.detectChanges();
        expect(component.password.status).toEqual('INVALID');
    });

    it('\'onSubmit\' method should be executed', () => {
        component.email.setValue(MOCK_EMAIL);
        component.password.setValue(MOCK_PASSWORD);
        fixture.detectChanges();
        component.onSubmit();

        const loginAction: LoginUser = new LoginUser(MOCK_CREDS);
        expect(store.dispatch).toHaveBeenCalledWith(loginAction);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('\'onSubmit\' method shouldn\'t be executed cause email field isn\'t valid', () => {
        component.email.setValue('');
        component.onSubmit();

        const loginAction: LoginUser = new LoginUser(MOCK_CREDS);

        expect(store.dispatch).not.toHaveBeenCalledWith(loginAction);
        expect(component.email.invalid).toBeTruthy();
        expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('\'onSubmit\' method shouldn\'t be executed cause password field isn\'t valid', () => {
        component.password.setValue('');
        component.onSubmit();
        const loginAction: LoginUser = new LoginUser(MOCK_CREDS);

        expect(store.dispatch).not.toHaveBeenCalledWith(loginAction);

        expect(component.password.invalid).toBeTruthy();
        expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    afterEach(() => {
        localStorage.clear();
    });

});
