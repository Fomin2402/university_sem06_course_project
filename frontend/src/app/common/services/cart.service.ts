import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

import { API_CART } from "../api-routes";

@Injectable()
export class CartService {
  constructor(private http: HttpClient) {}

  public getCart(): Observable<IMongoCart> {
    return this.http.get<IMongoCart>(API_CART.GET);
  }

  public addToCart(productId: string): Observable<any> {
    return this.http.post<any>(API_CART.POST_CART(productId), null);
  }

  public removeFromCart(productId: string): Observable<any> {
    return this.http.delete<any>(API_CART.DELETE_CART(productId));
  }
}
