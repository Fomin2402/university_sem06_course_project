import { Action } from "@ngrx/store";

export enum ProductActionTypes {
  START_REQUEST_PRODUCT = "[Product] Request is started",
  ERROR_PRODUCT = "[Product] There is an error",

  GET_PRODUCTS = "[Product] Get Products",
  GET_PRODUCTS_SUCCESS = "[Product] Get Products Success",
  GET_PRODUCTS_FAIL = "[Product] Get Products Fail",
}

export class StartRequestProduct implements Action {
  readonly type: ProductActionTypes.START_REQUEST_PRODUCT =
    ProductActionTypes.START_REQUEST_PRODUCT;
}
export class ErrorProduct implements Action {
  readonly type: ProductActionTypes.ERROR_PRODUCT =
    ProductActionTypes.ERROR_PRODUCT;

  constructor(public payload: Error) {}
}

export class LoadProducts implements Action {
  readonly type: ProductActionTypes.GET_PRODUCTS =
    ProductActionTypes.GET_PRODUCTS;
}
export class LoadProductsSuccess implements Action {
  readonly type: ProductActionTypes.GET_PRODUCTS_SUCCESS =
    ProductActionTypes.GET_PRODUCTS_SUCCESS;

  constructor(public payload: IProduct[]) {}
}
export class LoadProductsFail implements Action {
  readonly type: ProductActionTypes.GET_PRODUCTS_FAIL =
    ProductActionTypes.GET_PRODUCTS_FAIL;
}

export type ProductAction =
  | StartRequestProduct
  | ErrorProduct
  | LoadProducts
  | LoadProductsSuccess
  | LoadProductsFail;
