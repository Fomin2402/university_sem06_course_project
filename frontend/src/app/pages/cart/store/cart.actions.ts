import { Action } from "@ngrx/store";

export enum CartActionTypes {
  START_REQUEST_CART = "[Cart] Request is started",
  ERROR_CART = "[Cart] There is an error",

  GET_CART = "[Cart] Get Products",
  GET_CART_SUCCESS = "[Cart] Get Products Success",
  GET_CART_FAIL = "[Cart] Get Products Fail",
}

export class StartRequestCart implements Action {
  readonly type: CartActionTypes.START_REQUEST_CART =
    CartActionTypes.START_REQUEST_CART;
}
export class ErrorCart implements Action {
  readonly type: CartActionTypes.ERROR_CART = CartActionTypes.ERROR_CART;

  constructor(public payload: Error) {}
}

export class LoadCart implements Action {
  readonly type: CartActionTypes.GET_CART = CartActionTypes.GET_CART;
}
export class LoadCartSuccess implements Action {
  readonly type: CartActionTypes.GET_CART_SUCCESS =
    CartActionTypes.GET_CART_SUCCESS;

  constructor(public payload: IMongoCart) {}
}
export class LoadCartFail implements Action {
  readonly type: CartActionTypes.GET_CART_FAIL = CartActionTypes.GET_CART_FAIL;
}

export type CartAction =
  | StartRequestCart
  | ErrorCart
  | LoadCart
  | LoadCartSuccess
  | LoadCartFail;
