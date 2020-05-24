import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";

import { LoadCart } from "../store/cart.actions";
import { getCart } from "../store/cart.selectors";
import { Observable } from "rxjs";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent {
  public cart: Observable<IMongoCart | null>;

  constructor(private store: Store<IAppState>) {
    this.store.dispatch(new LoadCart());
    this.cart = this.store.pipe(select(getCart));
  }
}
