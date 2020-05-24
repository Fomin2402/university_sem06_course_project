import * as spinnerActions from '../actions/spinner.actions';
import {
    spinnerInitialState,
    spinnerReducer
} from './spinner.reducer';

describe('Spinner Reducer', () => {

    it('should execute OPEN_SPINNER case', () => {
        const expectedState: ISpinnerState = {
            display: true
        };

        const action: spinnerActions.SpinnerActions = new spinnerActions.OpenSpinnerAction();
        expect(action.type)
            .toEqual(spinnerActions.SpinnerActionTypes.OPEN_SPINNER);
        expect(spinnerReducer(spinnerInitialState, action))
            .toEqual(expectedState);
    });

    it('should execute CLOSE_SPINNER case', () => {
        const initState: ISpinnerState = {
            display: true
        };

        const action: spinnerActions.SpinnerActions = new spinnerActions.CloseSpinnerAction();
        expect(action.type)
            .toEqual(spinnerActions.SpinnerActionTypes.CLOSE_SPINNER);
        expect(spinnerReducer(initState, action))
            .toEqual(spinnerInitialState);
    });

});
