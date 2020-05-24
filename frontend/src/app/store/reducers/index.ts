import { profileInitialState } from './profile.reducer';
import { spinnerInitialState } from './spinner.reducer';

export * from "./profile.reducer";
export * from "./spinner.reducer";

export const initialAppState: IAppState = {
    profileState: profileInitialState,
    spinnerState: spinnerInitialState
};