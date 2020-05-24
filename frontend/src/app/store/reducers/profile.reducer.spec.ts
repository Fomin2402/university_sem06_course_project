import { profileInitialState, profileReducer } from './profile.reducer';
import * as profileActions from '../actions/profile.actions';
import { MOCK_USER_AGENT } from 'src/app/common/mocks';

describe('Profile Reducer', () => {

    it('should execute ERROR_USER_PROFILE case', () => {
        const error: Error = new Error('some error');
        const expectedState: IProfileState = {
            ...profileInitialState,
            error
        };

        const action: profileActions.ProfileAction = new profileActions.ErrorUserProfile(error);
        expect(action.type).toEqual(profileActions.ProfileActionTypes.ERROR_USER_PROFILE);
        expect(profileReducer(profileInitialState, action)).toEqual(expectedState);
    });

    it('should execute LOADING_USER_PROFILE case', () => {
        const expectedState: IProfileState = {
            ...profileInitialState,
            loading: true
        };

        const action: profileActions.ProfileAction = new profileActions.StartRequestUserProfile();
        expect(action.type).toEqual(profileActions.ProfileActionTypes.START_REQUEST_USER_PROFILE);
        expect(profileReducer(profileInitialState, action)).toEqual(expectedState);
    });

    it('should execute LOGIN_USER_SUCCESS case', () => {
        const expectedState: IProfileState = {
            ...profileInitialState,
            user: MOCK_USER_AGENT
        };

        const action: profileActions.ProfileAction = new profileActions.LoginUserSuccess(MOCK_USER_AGENT);
        expect(action.type).toEqual(profileActions.ProfileActionTypes.LOGIN_USER_SUCCESS);
        expect(profileReducer(profileInitialState, action)).toEqual(expectedState);
    });

    it('should execute LOGIN_USER_FAIL case', () => {
        const expectedState: IProfileState = profileInitialState;

        const action: profileActions.ProfileAction = new profileActions.LoginUserFail();
        expect(action.type).toEqual(profileActions.ProfileActionTypes.LOGIN_USER_FAIL);
        expect(profileReducer(profileInitialState, action)).toEqual(expectedState);
    });

    it('should execute GET_USER_PROFILE_SUCCESS case', () => {
        const expectedState: IProfileState = {
            ...profileInitialState,
            user: MOCK_USER_AGENT
        };

        const action: profileActions.ProfileAction = new profileActions.LoadProfileSuccess(MOCK_USER_AGENT);
        expect(action.type).toEqual(profileActions.ProfileActionTypes.GET_USER_PROFILE_SUCCESS);
        expect(profileReducer(profileInitialState, action)).toEqual(expectedState);
    });

});
