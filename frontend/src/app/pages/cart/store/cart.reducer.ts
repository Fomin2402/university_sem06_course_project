import { CartAction, CartActionTypes } from "./cart.actions";

export const cartInitialState: ICartState = {
  data: null,
  loading: false,
  error: null,
};

export function cartReducer(
  state: ICartState = cartInitialState,
  action: CartAction
): ICartState {
  switch (action.type) {
    case CartActionTypes.START_REQUEST_CART: {
      return {
        ...state,
        loading: true,
      };
    }

    case CartActionTypes.ERROR_CART: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case CartActionTypes.GET_CART_SUCCESS: {
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
