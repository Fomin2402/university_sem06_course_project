import { ProductAction, ProductActionTypes } from "./product.actions";

export const productInitialState: IProductState = {
  data: [],
  loading: false,
  error: null,
};

export function productReducer(
  state: IProductState = productInitialState,
  action: ProductAction
): IProductState {
  switch (action.type) {
    case ProductActionTypes.START_REQUEST_PRODUCT: {
      return {
        ...state,
        loading: true,
      };
    }

    case ProductActionTypes.ERROR_PRODUCT: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ProductActionTypes.GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case ProductActionTypes.REMOVE_PRODUCT: {
      const data: IProduct[] = [...state.data].filter(
        (item: IProduct) => item._id !== action.payload
      );
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
