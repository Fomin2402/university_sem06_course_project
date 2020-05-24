import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { API_MEDIA } from '../api-routes';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    private regExp: RegExp;

    constructor(private authService: AuthenticationService) {
        this.regExp = new RegExp(API_MEDIA);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isAvailable(request.url)) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${this.authService.token}`
                }
            });
        }

        return next.handle(request);
    }

    private isAvailable(url: string): boolean {
        return !!this.authService.token && !this.regExp.exec(url);
    }

}
