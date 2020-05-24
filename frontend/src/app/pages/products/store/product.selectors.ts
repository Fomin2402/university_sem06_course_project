import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from "@ngrx/store";

const getPRODUCTFeatureState: MemoizedSelector<
  IAppState,
  IProductState
> = createFeatureSelector<IProductState>("productState");

export const getProducts: MemoizedSelector<
  IAppState,
  IProduct[]
> = createSelector(
  getPRODUCTFeatureState,
  (state: IProductState) => state.data
);

export const getProductsLoading: MemoizedSelector<
  IAppState,
  boolean
> = createSelector(
  getPRODUCTFeatureState,
  (state: IProductState) => state.loading
);

export const getProductsError: MemoizedSelector<
  IAppState,
  any
> = createSelector(
  getPRODUCTFeatureState,
  (state: IProductState) => state.error
);
