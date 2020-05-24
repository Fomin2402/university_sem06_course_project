import { OrderAction, OrderActionTypes } from "./orders.actions";

export const orderInitialState: IOrderState = {
  data: [],
  loading: false,
  error: null,
};

export function orderReducer(
  state: IOrderState = orderInitialState,
  action: OrderAction
): IOrderState {
  switch (action.type) {
    case OrderActionTypes.START_REQUEST_ORDER: {
      return {
        ...state,
        loading: true,
      };
    }

    case OrderActionTypes.ERROR_ORDER: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case OrderActionTypes.GET_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    default:
      return state;
  }
}
