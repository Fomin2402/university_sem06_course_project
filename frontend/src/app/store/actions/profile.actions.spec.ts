import * as profileActions from './profile.actions';
import {
    MOCK_LOGIN_CREDENTIALS,
    MOCK_USER_AGENT,
} from 'src/app/common/mocks';

describe('Profile Actions', () => {

    it('should create an LoadingUserProfile', () => {
        const action: profileActions.ProfileAction = new profileActions.StartRequestUserProfile();
        expect(action.type).toEqual(profileActions.ProfileActionTypes.START_REQUEST_USER_PROFILE);
    });

    it('should create an ErrorUserProfile', () => {
        const err: Error = new Error('some error');
        const action: profileActions.ProfileAction = new profileActions.ErrorUserProfile(err);
        expect(action.type).toEqual(profileActions.ProfileActionTypes.ERROR_USER_PROFILE);
        expect(action.payload).toEqual(err);
    });

    it('should create an LoginUser', () => {
        const action: profileActions.ProfileAction = new profileActions.LoginUser(MOCK_LOGIN_CREDENTIALS);
        expect(action.type).toEqual(profileActions.ProfileActionTypes.LOGIN_USER);
        expect(action.payload).toEqual(MOCK_LOGIN_CREDENTIALS);
    });

    it('should create an LoginUserSuccess', () => {
        const action: profileActions.ProfileAction = new profileActions.LoginUserSuccess(MOCK_USER_AGENT);
        expect(action.type).toEqual(profileActions.ProfileActionTypes.LOGIN_USER_SUCCESS);
        expect(action.payload).toEqual(MOCK_USER_AGENT);
    });

    it('should create an LoginUserFail', () => {
        const action: profileActions.ProfileAction = new profileActions.LoginUserFail();
        expect(action.type).toEqual(profileActions.ProfileActionTypes.LOGIN_USER_FAIL);
    });

    it('should create an LoadProfile', () => {
        const action: profileActions.ProfileAction = new profileActions.LoadProfile();
        expect(action.type).toEqual(profileActions.ProfileActionTypes.GET_USER_PROFILE);
    });

    it('should create an LoadProfileSuccess', () => {
        const action: profileActions.ProfileAction = new profileActions.LoadProfileSuccess(MOCK_USER_AGENT);
        expect(action.type).toEqual(profileActions.ProfileActionTypes.GET_USER_PROFILE_SUCCESS);
        expect(action.payload).toEqual(MOCK_USER_AGENT);
    });

    it('should create an LoadProfileFail', () => {
        const action: profileActions.ProfileAction = new profileActions.LoadProfileFail();
        expect(action.type).toEqual(profileActions.ProfileActionTypes.GET_USER_PROFILE_FAIL);
    });

});