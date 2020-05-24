import { catchError, concatMap, map, switchMap, tap } from "rxjs/operators";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { ToastService } from "src/app/modules/toasts/toast.service";
import { AuthenticationService, UserService } from "src/app/common";
import * as profileActions from "../actions/profile.actions";

@Injectable()
export class ProfileEffect {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<profileActions.LoginUser>(
      profileActions.ProfileActionTypes.LOGIN_USER
    ),
    tap(() =>
      this.store.dispatch(new profileActions.StartRequestUserProfile())
    ),
    concatMap((loginUserAction: profileActions.LoginUser) =>
      this.authService.login(loginUserAction.payload).pipe(
        map((user: IUser) => new profileActions.LoginUserSuccess(user)),
        catchError((err: any) => {
          this.callToaster(err);
          this.store.dispatch(new profileActions.LoginUserFail());
          return of(new profileActions.ErrorUserProfile(err));
        })
      )
    )
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType<profileActions.LogoutUser>(
      profileActions.ProfileActionTypes.LOGOUT_USER
    ),
    tap(() =>
      this.store.dispatch(new profileActions.StartRequestUserProfile())
    ),
    switchMap(() =>
      this.authService.logout().pipe(
        map(() => new profileActions.LogoutUserSuccess()),
        catchError((err: any) => {
          this.store.dispatch(new profileActions.LogoutUserFail());
          return of(new profileActions.ErrorUserProfile(err));
        })
      )
    )
  );

  @Effect()
  loadProfile$: Observable<Action> = this.actions$.pipe(
    ofType<profileActions.LoadProfile>(
      profileActions.ProfileActionTypes.GET_USER_PROFILE
    ),
    tap(() =>
      this.store.dispatch(new profileActions.StartRequestUserProfile())
    ),
    switchMap(() =>
      this.userService.getMyself().pipe(
        map((user: IUser) => {
          if (user) {
            return new profileActions.LoadProfileSuccess(user);
          } else {
            this.store.dispatch(new profileActions.LoadProfileFail());
            return new profileActions.ErrorUserProfile(
              new Error("There is no user at ProffileEffect")
            );
          }
        }),
        catchError((err: any) => {
          this.store.dispatch(new profileActions.LoadProfileFail());
          return of(new profileActions.ErrorUserProfile(err));
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private toastService: ToastService,
    private userService: UserService,
    private store: Store<IAppState>
  ) {}

  private callToaster(err: any): void {
    const msg: any =
      err.error.message || err.error.errors || "Something went wrong";
    if (typeof msg === "string") {
      this.toastService.add({ msg });
    }
    if (Array.isArray(msg)) {
      msg.forEach((item: any) => {
        if (typeof item === "string") {
          this.toastService.add({ msg: item });
        }
      });
    }
  }
}
