import * as spinnerActions from './spinner.actions';

describe('Spinner actions', () => {

    it('should create a OpenSpinnerAction action', () => {
        const action: spinnerActions.SpinnerActions =
            new spinnerActions.OpenSpinnerAction();
        expect(action.type)
            .toEqual(spinnerActions.SpinnerActionTypes.OPEN_SPINNER);
    });

    it('should create a CloseSpinnerAction action', () => {
        const action: spinnerActions.SpinnerActions =
            new spinnerActions.CloseSpinnerAction();
        expect(action.type)
            .toEqual(spinnerActions.SpinnerActionTypes.CLOSE_SPINNER);
    });

});