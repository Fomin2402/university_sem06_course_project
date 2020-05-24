import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { LoadCart } from "../store/cart.actions";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  constructor(private store: Store<IAppState>) {
    this.store.dispatch(new LoadCart());
  }

  ngOnInit(): void {}
}
