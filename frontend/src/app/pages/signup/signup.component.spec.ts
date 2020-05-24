import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from 'src/app/common';
import { SignupComponent } from './signup.component';

// TODO: update here

describe('SignupComponent', () => {
    let fixture: ComponentFixture<SignupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SignupComponent
            ],
            providers: [
                AuthenticationService
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SignupComponent);
        fixture.detectChanges();
    });

    /*
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    */
});
