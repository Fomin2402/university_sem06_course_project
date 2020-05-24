import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { ToastService } from 'src/app/modules/toasts/toast.service';
import { AuthenticationService } from 'src/app/common';

const ERROR_MESSSAGE: string = 'Password setting failed.';

@Injectable()
export class SetPasswordService {

    private _tempToken!: string;

    constructor(
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private toastService: ToastService
    ) {
        const tempToken: string | null = this.route.snapshot.paramMap.get('token');
        if (!tempToken) {
            this.authService.redirectToMainPage();
        } else {
            this._tempToken = tempToken;
        }
    }

    resetPassword(password: string): Observable<any> {
        return this.authService.resetPassword(this._tempToken, password)
            .pipe(
                tap(() => this.toastService.add({ msg: 'The new password was set successfully. ' })),
                catchError((res: HttpErrorResponse) => {
                    const { error } = { ...res };

                    if (Array.isArray(error.password)) {
                        error.password.forEach((err: any) => this.sendMessageToToast(err));
                    } else {
                        this.sendMessageToToast(error.password);
                    }

                    return throwError(error);
                })
            );
    }

    private sendMessageToToast(msg: any): void {
        if (typeof msg === 'string') {
            this.toastService.add({ msg });
        } else {
            this.toastService.add({ msg: ERROR_MESSSAGE });
        }
    }

}
