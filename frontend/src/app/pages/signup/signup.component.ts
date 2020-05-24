import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { confirmPasswordValidator } from './confirm-password.validator';
import { AuthenticationService } from 'src/app/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
    selector: 'realtorx-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    showPassword: boolean;
    signupForm: FormGroup;
    error: boolean;

    constructor(private authenticationService: AuthenticationService) {
        this.signupForm = new FormGroup({
            'fullname': new FormControl('', [Validators.required]),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
            'confirmPassword': new FormControl('', [Validators.required]),
            'company': new FormControl('', [Validators.required]),
            'termsAndPolicy': new FormControl(false, [Validators.required, Validators.requiredTrue]),
        }, { validators: confirmPasswordValidator });
    }

    get fullname(): AbstractControl {
        return this.signupForm.controls['fullname'];
    }
    get email(): AbstractControl {
        return this.signupForm.controls['email'];
    }
    get password(): AbstractControl {
        return this.signupForm.controls['password'];
    }
    get confirmPassword(): AbstractControl {
        return this.signupForm.controls['confirmPassword'];
    }
    get company(): AbstractControl {
        return this.signupForm.controls['company'];
    }
    get termsAndPolicy(): AbstractControl {
        return this.signupForm.controls['termsAndPolicy'];
    }

    ngOnInit(): void { }

    switchShowPassword(): void {
        this.showPassword = !this.showPassword;
    }

    onSubmit(): void {

        if (this.signupForm.invalid) {
            return;
        }

        const body: ISignupCredentials = {
            full_name: this.fullname.value,
            password: this.password.value,
            email: this.email.value,
            agency_name: this.company.value,
        };

        this.authenticationService.signup(body)
            .pipe(
                catchError((err: any) => {
                    this.error = true;
                    return throwError(err);
                })
            )
            .subscribe();
    }

}
