import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { LoadOrders } from "../store/orders.actions";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  constructor(private store: Store<IAppState>) {
    this.store.dispatch(new LoadOrders());
  }

  ngOnInit(): void {}
}
