import { SpinnerActions, SpinnerActionTypes } from '../actions';

export const spinnerInitialState: ISpinnerState = {
    display: false
};

export function spinnerReducer(state: ISpinnerState = spinnerInitialState, action: SpinnerActions): ISpinnerState {
    switch (action.type) {
    case SpinnerActionTypes.OPEN_SPINNER: {
        return {
            display: true
        };
    }

    case SpinnerActionTypes.CLOSE_SPINNER: {
        return {
            display: false
        };
    }

    default: {
        return state;
    }
    }
}