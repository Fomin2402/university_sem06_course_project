import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { SetPasswordService } from './set-password.service';

const ERROR_MESSAGE: string = 'Passwords don\'t match.';

@Component({
    selector: 'agencyapp-set-password',
    templateUrl: './set-password.component.html',
    styleUrls: ['./set-password.component.scss'],
    providers: [
        SetPasswordService
    ]
})
export class SetPasswordComponent implements OnInit {

    error!: boolean;
    dontMatch: string | null;
    showPass: boolean = false;
    setPasswordForm!: FormGroup;
    agency!: IAgency;

    constructor(
        private setPasswordService: SetPasswordService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.setPasswordForm = new FormGroup({
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required])
        });
        this.agency = this.route.snapshot.data.agency;
    }

    get password(): AbstractControl {
        return this.setPasswordForm.controls['password'];
    }

    get confirmPassword(): AbstractControl {
        return this.setPasswordForm.controls['confirmPassword'];
    }

    onSubmit(): void {
        if (this.password.value !== this.confirmPassword.value || this.setPasswordForm.invalid) {
            this.password.markAsTouched();
            this.dontMatch = ERROR_MESSAGE;
            return;
        }
        this.setPasswordService.resetPassword(this.password.value)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.error = true;
                    return throwError(error);
                })
            ).subscribe();
    }

    switchDisplayingPassword(): void {
        this.showPass = !this.showPass;
    }

}
