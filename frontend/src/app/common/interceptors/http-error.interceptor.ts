import { catchError, retry } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

import { environment } from "src/environments/environment";
import { AuthenticationService } from "../services";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string = "";

        if (error.status === 401) {
          this.authService.reset();
          return throwError(error);
        }

        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        if (!environment.production) {
          window.alert(errorMessage);
        }
        return throwError(error);
      })
    );
  }
}
