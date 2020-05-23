import { Result, ValidationError } from 'express-validator';

interface ICheckParam {
    check: boolean | (() => boolean);
    errorMessage: string;
    data?: any;
    errorCode?: number;
}

export function checkValidationResult(errors: Result<ValidationError>): void {
    customCheck({
        check: errors.isEmpty(),
        errorMessage: errors.array()[0]?.msg,
        data: errors.array(),
        errorCode: 422,
    });
}

export function customCheck({
    check,
    errorMessage,
    errorCode = 401,
    data,
}: ICheckParam): void {
    let res: boolean = !!check;

    if (typeof check === 'function') {
        res = check();
    }
    if (!res) {
        const error = new Error(errorMessage);
        (error as any).statusCode = errorCode;
        (error as any).data = data;
        throw error;
    }
}
