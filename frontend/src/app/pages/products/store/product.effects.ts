import { catchError, concatMap, map, switchMap, tap } from "rxjs/operators";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { ToastService } from "src/app/modules/toasts/toast.service";
import * as productActions from "./product.actions";
import { ProductService } from "src/app/common";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class ProductEffect {
  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    ofType<productActions.LoadProducts>(
      productActions.ProductActionTypes.GET_PRODUCTS
    ),
    tap(() => this.store.dispatch(new productActions.StartRequestProduct())),
    switchMap((loadProducts: productActions.LoadProducts) => {
      let params: HttpParams = new HttpParams();
      if (loadProducts.payload && typeof loadProducts.payload === "string") {
        params = params.append("search", loadProducts.payload);
      }
      return this.productService.getProducts(params).pipe(
        map(
          (result: IProduct[]) => new productActions.LoadProductsSuccess(result)
        ),
        catchError((err: any) => {
          this.callToaster(err);
          this.store.dispatch(new productActions.LoadProductsFail());
          return of(new productActions.ErrorProduct(err));
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private toastService: ToastService,
    private productService: ProductService,
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
