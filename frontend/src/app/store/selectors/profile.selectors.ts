import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from "@ngrx/store";

const getProfileFeatureState: MemoizedSelector<
  IAppState,
  IProfileState
> = createFeatureSelector<IProfileState>("profileState");

export const getUserProfile: MemoizedSelector<
  IAppState,
  IUser | null
> = createSelector(
  getProfileFeatureState,
  (state: IProfileState) => state.user
);

export const getUserProfileId: MemoizedSelector<
  IAppState,
  string | null
> = createSelector(getUserProfile, (user: IUser | null) => {
  if (user && user._id) {
    return user._id;
  }
  return null;
});

export const getUserProfileLoading: MemoizedSelector<
  IAppState,
  boolean
> = createSelector(
  getProfileFeatureState,
  (state: IProfileState) => state.loading
);

export const getUserProfileError: MemoizedSelector<
  IAppState,
  any
> = createSelector(
  getProfileFeatureState,
  (state: IProfileState) => state.error
);
