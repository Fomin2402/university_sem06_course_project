import { Observable, throwError } from "rxjs";
import { FormControl } from "@angular/forms";
import { catchError } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { Component } from "@angular/core";

import { LoadProducts, RemoveProduct } from "../store/product.actions";
import { ToastService } from "src/app/modules/toasts/toast.service";
import { CartService, ProductService } from "src/app/common";
import { getProducts } from "../store/product.selectors";
import { getUserIsAdmin } from "src/app/store/selectors";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
  providers: [CartService, ProductService],
})
export class ProductsComponent {
  public products: Observable<IProduct[]>;
  public isAdmin: Observable<boolean>;
  public search!: FormControl;

  constructor(
    private store: Store<IAppState>,
    private cartService: CartService,
    private productService: ProductService,
    private toastService: ToastService
  ) {
    this.store.dispatch(new LoadProducts());
    this.products = this.store.pipe(select(getProducts));
    this.isAdmin = this.store.pipe(select(getUserIsAdmin));
    this.search = new FormControl("");
  }

  addToCart(product: IProduct): void {
    this.cartService
      .addToCart(product._id)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        this.toastService.add({ msg: `"${product.title}" was added to cart.` });
      });
  }
  removeProduct(product: IProduct): void {
    this.productService
      .removeProduct(product._id)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        this.toastService.add({ msg: `"${product.title}" was removed.` });
        this.store.dispatch(new RemoveProduct(product._id));
      });
  }
}
