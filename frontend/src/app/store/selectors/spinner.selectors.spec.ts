import { getDisplaySpinner } from './spinner.selectors';
import { initialAppState } from '../reducers';

describe('Spinner Selectors', () => {

    const display: boolean = true;

    const appState: IAppState = initialAppState;
    appState.spinnerState = {
        display
    };

    it('should return display spinnet Home from AppState', () => {
        expect(getDisplaySpinner(appState)).toEqual(display);
    });

});
