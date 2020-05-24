import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { API_PRODUCT } from "..";

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<any> {
    return this.http.get<any>(API_PRODUCT.GET_PRODUCTS);
  }

  public getProductById(orderId: string): Observable<any> {
    return this.http.get<any>(API_PRODUCT.GET_PRODUCT_BY_ID(orderId));
  }

  public addProduct(data: FormData): Observable<any> {
    return this.http.post<any>(API_PRODUCT.POST_PRODUCT, data);
  }

  public updateProduct(productId: string, data: FormData): Observable<any> {
    return this.http.patch<any>(API_PRODUCT.PATCH_PRODUCT(productId), data);
  }

  public removeProduct(productId: string): Observable<any> {
    return this.http.delete<any>(API_PRODUCT.DELEETE_PRODUCT(productId));
  }
}
