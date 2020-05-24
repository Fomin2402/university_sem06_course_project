import * as profileSelectors from './profile.selectors';
import { MOCK_USER_AGENT } from 'src/app/common/mocks';
import { initialAppState } from '../reducers';

describe('Profile selectors', () => {

    const user: IUser = MOCK_USER_AGENT;
    const loading: boolean = false;
    const error: Error = new Error('some error');

    const appState: IAppState = initialAppState;
    appState.profileState = {
        loading,
        user,
        error,
        calendarSyncStatus: null
    };

    it('should return loading value from AppState', () => {
        expect(profileSelectors.getUserProfileLoading(appState)).toEqual(loading);
    });

    it('should return user from AppState', () => {
        expect(profileSelectors.getUserProfile(appState)).toEqual(MOCK_USER_AGENT);
    });

    it('should return error from AppState', () => {
        expect(profileSelectors.getUserProfileError(appState)).toEqual(error);
    });

});
