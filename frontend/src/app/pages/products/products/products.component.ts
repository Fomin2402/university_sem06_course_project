import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { LoadProducts } from "../store/product.actions";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  constructor(private store: Store<IAppState>) {
    this.store.dispatch(new LoadProducts());
  }

  ngOnInit(): void {}
}
