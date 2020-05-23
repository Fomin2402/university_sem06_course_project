interface ICheckParam {
    check: boolean | (() => boolean);
    errorMessage: string;
    data?: any;
    errorCode?: number;
}

export function check({
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
