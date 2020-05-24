import { catchError, concatMap, map, switchMap, tap } from "rxjs/operators";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { ToastService } from "src/app/modules/toasts/toast.service";
import * as productActions from "./cart.actions";
import { CartService } from "src/app/common";

@Injectable()
export class CartEffect {
  @Effect()
  getCart$: Observable<Action> = this.actions$.pipe(
    ofType<productActions.LoadCart>(productActions.CartActionTypes.GET_CART),
    tap(() => this.store.dispatch(new productActions.StartRequestCart())),
    switchMap((loginUserAction: productActions.LoadCart) =>
      this.cartService.getCart().pipe(
        map((result: IMongoCart) => new productActions.LoadCartSuccess(result)),
        catchError((err: any) => {
          this.callToaster(err);
          this.store.dispatch(new productActions.LoadCartFail());
          return of(new productActions.ErrorCart(err));
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private toastService: ToastService,
    private cartService: CartService,
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
