import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from "@ngrx/store";

const getCartFeatureState: MemoizedSelector<
  IAppState,
  ICartState
> = createFeatureSelector<ICartState>("cartState");

export const getCart: MemoizedSelector<IAppState, ICart> = createSelector(
  getCartFeatureState,
  (state: ICartState) => state.data
);

export const getCartLoading: MemoizedSelector<
  IAppState,
  boolean
> = createSelector(getCartFeatureState, (state: ICartState) => state.loading);

export const getCartError: MemoizedSelector<IAppState, any> = createSelector(
  getCartFeatureState,
  (state: ICartState) => state.error
);
