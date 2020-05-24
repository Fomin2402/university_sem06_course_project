import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { ResetStore } from "src/app/store/clear-state";
import { API_AUTH } from "../api-routes";

export const TOKEN_SYMBOL: string = "FAF-TOKEN";

@Injectable()
export class AuthenticationService {
  returnUrl: string = "";

  get token(): string | null {
    return localStorage.getItem(TOKEN_SYMBOL);
  }
  get isAuthenticated(): boolean {
    return !!this.token;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<IAppState>
  ) {}

  login(creditionals: IProfileCreditionals): Observable<ILoignResponse> {
    return this.http
      .post<ILoignResponse>(API_AUTH.POST_LOGIN, creditionals)
      .pipe(tap((res: ILoignResponse) => this.checkLoginResponse(res)));
  }

  signup(data: ISignUpParams): Observable<any> {
    return this.http.post<any>(API_AUTH.POST_SIGN_UP, data);
  }

  sendRequestForResetPassword(email: string): Observable<any> {
    return this.http.post(API_AUTH.POST_REQ_FOR_RESET_PASS, { email });
  }

  resetPassword(data: IResetPassParams): Observable<any> {
    return this.http
      .post(API_AUTH.POST_RESET_PASS, data)
      .pipe(tap(() => this.redirectToLoginPage()));
  }

  logout(): Observable<any> {
    this.reset();
    return of({});
  }

  reset(): void {
    this.returnUrl = "";
    this.store.dispatch(new ResetStore());
    this.setToken();
    this.redirectToLoginPage();
  }

  redirectToLoginPage(): void {
    this.router.navigate(["/login"]);
  }

  redirectToMainPage(): void {
    this.router.navigate(["/"]);
  }

  private checkLoginResponse(res: ILoignResponse): void {
    this.checkResponseForToken(res);
    this.redirectToMainPage();
  }

  private checkResponseForToken(res: ILoignResponse): boolean {
    const token: string | null = res.token;
    if (token) {
      this.setToken(token);
      return true;
    } else {
      throw new Error("There is no token at response");
    }
  }

  private setToken(token?: string): void {
    if (!token) {
      localStorage.clear();
    } else {
      localStorage.setItem(TOKEN_SYMBOL, token);
    }
  }
}
