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

    case CartActionTypes.REMOVE_PRODUCT_FROM_CART: {
      let data: IMongoCart | null = state.data;

      if (data && data.products) {
        data = {
          products: data.products.filter(
            (item: IMongoCartItem) => item.productId._id !== action.payload
          ),
        };
      }

      return {
        ...state,
        loading: false,
        data,
      };
    }

    default:
      return state;
  }
}
