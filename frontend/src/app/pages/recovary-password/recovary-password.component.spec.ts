import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { RecoveryPasswordComponent } from './recovary-password.component';
import { ToastService } from 'src/app/modules/toasts/toast.service';
import {
    AuthenticationService,
    MOCK_AGENCY,
    MOCK_AUTHENTICATION_SERVICE
} from 'src/app/common';

describe('RecoveryPasswordComponent', () => {

    let authnService: AuthenticationService;
    let component: RecoveryPasswordComponent;
    let fixture: ComponentFixture<RecoveryPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecoveryPasswordComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                ToastService,
                { provide: AuthenticationService, useValue: MOCK_AUTHENTICATION_SERVICE },
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
        })
            .compileComponents();

        fixture = TestBed.createComponent(RecoveryPasswordComponent);
        authnService = TestBed.inject(AuthenticationService);

        component = fixture.componentInstance;
        fixture.detectChanges();

    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('email should be existed', () => {
        expect(component.email).toBeTruthy();
    });

    it('email field of form should be invalid', () => {
        component.email.markAsTouched();
        component.email.setValue('qwerty');
        fixture.detectChanges();
        expect(component.email.status).toEqual('INVALID');
    });

    // UPDATE TESTS

    it('\'onSubmit\' method shouldn\'t be executed cause email field is invalid', () => {

        const spy: jasmine.Spy = spyOn(authnService, 'recoveryPassword');

        component.onSubmit();

        expect(spy).toHaveBeenCalledTimes(0);
    });

});
