import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { saveAs } from "file-saver";
import { Observable } from "rxjs";

import { getOrder, getOrderLoading } from "../store/orders.selectors";
import { LoadOrders } from "../store/orders.actions";
import { OrderService } from "src/app/common";

const mediaType = "application/pdf";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  providers: [OrderService],
})
export class OrdersComponent {
  public orders: Observable<any>;
  public loading: Observable<boolean>;

  constructor(
    private store: Store<IAppState>,
    private orderService: OrderService
  ) {
    this.store.dispatch(new LoadOrders());
    this.orders = this.store.pipe(select(getOrder));
    this.loading = this.store.pipe(select(getOrderLoading));
  }

  public getInoice(orderId: string): void {
    this.orderService
      .getInvoiceByOrderId(orderId)
      .subscribe((data: any) => this.downloadFile(orderId, data));
  }

  private downloadFile(orderId, response) {
    var blob = new Blob([response], { type: mediaType });
    saveAs(blob, `${orderId}-invoice.pdf`);
  }
}
