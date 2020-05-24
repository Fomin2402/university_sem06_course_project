import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";

import { LoadProducts } from "../store/product.actions";
import { getProducts } from "../store/product.selectors";
import { Observable } from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent {
  products: Observable<IProduct[]>;

  constructor(private store: Store<IAppState>) {
    this.store.dispatch(new LoadProducts());
    this.products = this.store.pipe(select(getProducts));
  }
}
