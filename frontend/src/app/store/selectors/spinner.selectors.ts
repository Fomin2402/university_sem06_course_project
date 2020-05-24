import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

const getSpinnerState: MemoizedSelector<IAppState, ISpinnerState> =
    createFeatureSelector<ISpinnerState>('spinnerState');

export const getDisplaySpinner: MemoizedSelector<IAppState, boolean> = createSelector(
    getSpinnerState,
    (state: ISpinnerState) => state.display
);
