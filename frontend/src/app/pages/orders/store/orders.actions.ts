import { Action } from "@ngrx/store";

export enum OrderActionTypes {
  START_REQUEST_ORDER = "[Order] Request is started",
  ERROR_ORDER = "[Order] There is an error",

  GET_ORDER = "[Order] Get Products",
  GET_ORDER_SUCCESS = "[Order] Get Products Success",
  GET_ORDER_FAIL = "[Order] Get Products Fail",
}

export class StartRequestOrder implements Action {
  readonly type: OrderActionTypes.START_REQUEST_ORDER =
    OrderActionTypes.START_REQUEST_ORDER;
}
export class ErrorOrder implements Action {
  readonly type: OrderActionTypes.ERROR_ORDER = OrderActionTypes.ERROR_ORDER;

  constructor(public payload: Error) {}
}

export class LoadOrders implements Action {
  readonly type: OrderActionTypes.GET_ORDER = OrderActionTypes.GET_ORDER;
}
export class LoadOrdersSuccess implements Action {
  readonly type: OrderActionTypes.GET_ORDER_SUCCESS =
    OrderActionTypes.GET_ORDER_SUCCESS;

  constructor(public payload: IMongoOrder[]) {}
}
export class LoadOrdersFail implements Action {
  readonly type: OrderActionTypes.GET_ORDER_FAIL =
    OrderActionTypes.GET_ORDER_FAIL;
}

export type OrderAction =
  | StartRequestOrder
  | ErrorOrder
  | LoadOrders
  | LoadOrdersSuccess
  | LoadOrdersFail;
