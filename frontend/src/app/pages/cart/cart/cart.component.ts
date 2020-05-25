import { MatDialog } from "@angular/material/dialog";
import { Observable, throwError } from "rxjs";
import { Store, select } from "@ngrx/store";
import { catchError } from "rxjs/operators";
import { Component } from "@angular/core";

import { LoadCart, RemoveProductFromCart } from "../store/cart.actions";
import { ToastService } from "src/app/modules/toasts/toast.service";
import { getCart, getCartLoading } from "../store/cart.selectors";
import { PaymentComponent } from "../payment/payment.component";
import { CartService } from "src/app/common";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  providers: [CartService],
})
export class CartComponent {
  public cart: Observable<IMongoCart | null>;
  public loading: Observable<boolean>;

  constructor(
    private store: Store<IAppState>,
    private cartService: CartService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {
    this.store.dispatch(new LoadCart());
    this.cart = this.store.pipe(select(getCart));
    this.loading = this.store.pipe(select(getCartLoading));
  }

  public removeProductFromCart(product: IProduct): void {
    this.cartService
      .removeFromCart(product._id)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.toastService.add({
          msg: `"${product.title}" was removed from cart.`,
        });
        this.store.dispatch(new RemoveProductFromCart(product._id));
      });
  }

  public payForTheOrder(): void {
    this.dialog.open(PaymentComponent, {
      width: "min-conent",
      height: "min-conent",
      data: { someData: "someData" },
    });
  }
}
