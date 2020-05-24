import { Action } from '@ngrx/store';

export enum SpinnerActionTypes {
    OPEN_SPINNER = '[ Spinner ] Open Spinner',
    CLOSE_SPINNER = '[ Spinner ] Close Spinner'
}

export class OpenSpinnerAction implements Action {
    readonly type: SpinnerActionTypes.OPEN_SPINNER
    = SpinnerActionTypes.OPEN_SPINNER;
}

export class CloseSpinnerAction implements Action {
    readonly type: SpinnerActionTypes.CLOSE_SPINNER
    = SpinnerActionTypes.CLOSE_SPINNER;
}

export type SpinnerActions =
    | OpenSpinnerAction
    | CloseSpinnerAction;