import { productInitialState } from "src/app/pages/products/store/product.reducer";
import { orderInitialState } from 'src/app/pages/orders/store/orders.reducer';
import { cartInitialState } from "src/app/pages/cart/store/cart.reducer";
import { profileInitialState } from "./profile.reducer";
import { spinnerInitialState } from "./spinner.reducer";

export * from "./profile.reducer";
export * from "./spinner.reducer";

export const initialAppState: IAppState = {
  profileState: profileInitialState,
  spinnerState: spinnerInitialState,
  productState: productInitialState,
  cartState: cartInitialState,
  orderState: orderInitialState,
};
