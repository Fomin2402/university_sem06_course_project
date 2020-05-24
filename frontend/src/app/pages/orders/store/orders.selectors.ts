import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from "@ngrx/store";

const getOrderFeatureState: MemoizedSelector<
  IAppState,
  IOrderState
> = createFeatureSelector<IOrderState>("orderState");

export const getCart: MemoizedSelector<IAppState, IOrder> = createSelector(
  getOrderFeatureState,
  (state: IOrderState) => state.data
);

export const getCartLoading: MemoizedSelector<
  IAppState,
  boolean
> = createSelector(getOrderFeatureState, (state: IOrderState) => state.loading);

export const getCartError: MemoizedSelector<IAppState, any> = createSelector(
  getOrderFeatureState,
  (state: IOrderState) => state.error
);
