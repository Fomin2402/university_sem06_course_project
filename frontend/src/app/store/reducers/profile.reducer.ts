import { ProfileAction, ProfileActionTypes } from "../actions/profile.actions";
export const profileInitialState: IProfileState = {
  user: null,
  loading: false,
  error: null,
};

export function profileReducer(
  state: IProfileState = profileInitialState,
  action: ProfileAction
): IProfileState {
  switch (action.type) {
    case ProfileActionTypes.START_REQUEST_USER_PROFILE: {
      return {
        ...state,
        loading: true,
      };
    }

    case ProfileActionTypes.ERROR_USER_PROFILE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ProfileActionTypes.LOGIN_USER_SUCCESS:
    case ProfileActionTypes.GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    }

    default:
      return state;
  }
}
