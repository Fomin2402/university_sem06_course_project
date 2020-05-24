import { Action } from "@ngrx/store";

export enum ProfileActionTypes {
  START_REQUEST_USER_PROFILE = "[Profile] Request is started",
  ERROR_USER_PROFILE = "[Profile] There is an error",

  LOGIN_USER = "[Profile] Login User",
  LOGIN_USER_SUCCESS = "[Profile] Login User Success",
  LOGIN_USER_FAIL = "[Profile] Login User Fail",

  GET_USER_PROFILE = "[Profile] Load User Profile",
  GET_USER_PROFILE_SUCCESS = "[Profile] Load User Profile Success",
  GET_USER_PROFILE_FAIL = "[Profile] Load User Profile Fail",
}

export class StartRequestUserProfile implements Action {
  readonly type: ProfileActionTypes.START_REQUEST_USER_PROFILE =
    ProfileActionTypes.START_REQUEST_USER_PROFILE;
}
export class ErrorUserProfile implements Action {
  readonly type: ProfileActionTypes.ERROR_USER_PROFILE =
    ProfileActionTypes.ERROR_USER_PROFILE;

  constructor(public payload: Error) {}
}

export class LoginUser implements Action {
  readonly type: ProfileActionTypes.LOGIN_USER = ProfileActionTypes.LOGIN_USER;

  constructor(public payload: IProfileCreditionals) {}
}
export class LoginUserSuccess implements Action {
  readonly type: ProfileActionTypes.LOGIN_USER_SUCCESS =
    ProfileActionTypes.LOGIN_USER_SUCCESS;

  constructor(public payload: IUser) {}
}
export class LoginUserFail implements Action {
  readonly type: ProfileActionTypes.LOGIN_USER_FAIL =
    ProfileActionTypes.LOGIN_USER_FAIL;
}

export class LoadProfile implements Action {
  readonly type: ProfileActionTypes.GET_USER_PROFILE =
    ProfileActionTypes.GET_USER_PROFILE;
}
export class LoadProfileSuccess implements Action {
  readonly type: ProfileActionTypes.GET_USER_PROFILE_SUCCESS =
    ProfileActionTypes.GET_USER_PROFILE_SUCCESS;

  constructor(public payload: IUser) {}
}
export class LoadProfileFail implements Action {
  readonly type: ProfileActionTypes.GET_USER_PROFILE_FAIL =
    ProfileActionTypes.GET_USER_PROFILE_FAIL;
}

export type ProfileAction =
  | StartRequestUserProfile
  | ErrorUserProfile
  | LoginUser
  | LoginUserSuccess
  | LoginUserFail
  | LoadProfile
  | LoadProfileSuccess
  | LoadProfileFail;
