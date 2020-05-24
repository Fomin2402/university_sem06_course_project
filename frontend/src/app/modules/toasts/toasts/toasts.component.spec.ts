import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast/toast.component';
import { ToastsComponent } from './toasts.component';
import { ToastService } from '../toast.service';

describe('ToastsComponent', () => {
    let component: ToastComponent;
    let fixture: ComponentFixture<ToastComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ToastComponent,
                ToastsComponent
            ],
            providers: [
                ToastService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToastComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
