import { catchError, concatMap, map, switchMap, tap } from "rxjs/operators";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { ToastService } from "src/app/modules/toasts/toast.service";
import * as productActions from "./orders.actions";
import { OrderService } from "src/app/common";

@Injectable()
export class OrderEffect {
  @Effect()
  getOrders$: Observable<Action> = this.actions$.pipe(
    ofType<productActions.LoadOrders>(
      productActions.OrderActionTypes.GET_ORDER
    ),
    tap(() => this.store.dispatch(new productActions.StartRequestOrder())),
    switchMap((loginUserAction: productActions.LoadOrders) =>
      this.orderService.getOrders().pipe(
        map(
          (result: IMongoOrder[]) =>
            new productActions.LoadOrdersSuccess(result)
        ),
        catchError((err: any) => {
          this.callToaster(err);
          this.store.dispatch(new productActions.LoadOrdersFail());
          return of(new productActions.ErrorOrder(err));
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private toastService: ToastService,
    private orderService: OrderService,
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
