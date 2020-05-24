import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { SetPasswordComponent } from './set-password.component';
import { SetPasswordService } from './set-password.service';
import { MOCK_AGENCY } from 'src/app/common';
import { ToastService } from 'src/app/modules/toasts/toast.service';

// TODO: update tests

describe('SetPasswordComponent', () => {

    let component: SetPasswordComponent;
    let fixture: ComponentFixture<SetPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [
                SetPasswordService,
                ToastService,
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
            ],
            declarations: [
                SetPasswordComponent
            ]
        })
            .overrideComponent(SetPasswordComponent, {
                set: {
                    providers: [
                        { provide: SetPasswordService, useValue: {} }
                    ]
                }
            })
            .compileComponents();

        fixture = TestBed.createComponent(SetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
