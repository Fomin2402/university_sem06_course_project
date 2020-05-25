import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from "@ngrx/store";

const getOrderFeatureState: MemoizedSelector<
  IAppState,
  IOrderState
> = createFeatureSelector<IOrderState>("orderState");

export const getOrder: MemoizedSelector<IAppState, IMongoOrder[]> = createSelector(
  getOrderFeatureState,
  (state: IOrderState) => state.data
);

export const getOrderLoading: MemoizedSelector<
  IAppState,
  boolean
> = createSelector(getOrderFeatureState, (state: IOrderState) => state.loading);

export const getOrderError: MemoizedSelector<IAppState, any> = createSelector(
  getOrderFeatureState,
  (state: IOrderState) => state.error
);
