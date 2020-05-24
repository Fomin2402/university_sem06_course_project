import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'src/app/common';
import { ToastService } from 'src/app/modules/toasts/toast.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
    selector: 'agencyapp-recovery-password',
    templateUrl: './recovary-password.component.html',
    styleUrls: ['./recovary-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {

    incorrectValues: boolean = false;
    emailForm!: FormGroup;
    agency!: IAgency;

    constructor(
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        this.agency = this.route.snapshot.data.agency;

        this.emailForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    get email(): AbstractControl {
        return this.emailForm.controls['email'];
    }

    onSubmit(): void {
        if (this.emailForm.invalid) {
            this.email.markAsTouched();
            return;
        }
        this.authService.recoveryPassword(this.email.value)
            .pipe(
                catchError((err: any) => {
                    this.incorrectValues = true;
                    const msg: string = err.error || 'Something went wrong';
                    this.toastService.add({ msg });
                    return throwError(err);
                })
            )
            .subscribe(() => {
                this.authService.redirectToMainPage();
                this.toastService.add({ msg: 'A link to reset password has been sent to your e-mail.' });
            });
    }

}
