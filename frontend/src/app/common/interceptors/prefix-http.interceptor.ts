import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable()
export class PrefixHttpInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url: string = `${environment.url}/${req.url}`;
        req = req.clone({
            url
        });

        return next.handle(req);
    }

}
