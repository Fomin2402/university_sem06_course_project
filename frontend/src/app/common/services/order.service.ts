import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { API_ORDER } from "../api-routes";

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  public getOrders(): Observable<any> {
    return this.http.get<any>(API_ORDER.GET_ORDERS);
  }

  public getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(API_ORDER.GET_ORDER_BY_ID(orderId));
  }

  public getInvoiceByOrderId(orderId: string): Observable<any> {
    return this.http.get<any>(API_ORDER.GET_INVOICE_BY_ORDER_ID(orderId));
  }

  public makeOrder(): Observable<any> {
    return this.http.post<any>(API_ORDER.POST_ORDER, null);
  }
}
