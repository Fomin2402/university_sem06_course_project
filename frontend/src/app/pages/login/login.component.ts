import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import { MOCK_EMAIL, MOCK_PASSWORD } from 'src/app/common';
import { getUserProfileError } from 'src/app/store/selectors';
import { environment } from 'src/environments/environment';
import { LoginUser } from 'src/app/store/actions';

@Component({
    selector: 'agencyapp-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    showPass: boolean = false;
    incorrectValues: boolean = false;
    loginForm!: FormGroup;
    agency!: IAgency;

    private subscription!: Subscription;

    constructor(
        private store: Store<IAppState>,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.agency = this.route.snapshot.data.agency;

        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        });
        this.setSubscriptions();

        if (!environment.production) {
            this.email.setValue(MOCK_EMAIL);
            this.password.setValue(MOCK_PASSWORD);
        }
    }

    get email(): AbstractControl {
        return this.loginForm.controls['email'];
    }

    get password(): AbstractControl {
        return this.loginForm.controls['password'];
    }

    switchDisplayingPassword(): void {
        this.showPass = !this.showPass;
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.email.markAsTouched();
            this.password.markAsTouched();
            return;
        }

        const creds: IProfileCreditionals = {
            email: this.email.value,
            password: this.password.value
        };

        const activeElement: HTMLElement | null = document.activeElement as HTMLElement;
        if (activeElement) {
            activeElement.blur();
        }

        this.store.dispatch(new LoginUser(creds));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private setSubscriptions(): void {
        this.subscription = new Subscription();
        this.subscription.add(
            this.store
                .pipe(select(getUserProfileError))
                .subscribe((error: any) => {
                    if (error) {
                        this.incorrectValues = true;
                    }
                })
        );
    }

}
