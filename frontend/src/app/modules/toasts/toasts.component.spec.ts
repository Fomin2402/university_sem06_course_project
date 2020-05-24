import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toasts/toast/toast.component';
import { ToastsComponent } from './toasts/toasts.component';
import { ToastService } from './toast.service';

describe('ToastsComponent', () => {
    let component: ToastsComponent;
    let fixture: ComponentFixture<ToastsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ToastsComponent,
                ToastComponent
            ],
            providers: [
                ToastService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToastsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
