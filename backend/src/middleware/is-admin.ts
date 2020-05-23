import { NextFunction, Request, Response } from 'express';

import { customCheck } from '../utils/check';

export const isAdmin = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const isAdmin: boolean = (req as any).isAdmin;
    console.log('isAdmin');
    console.log(isAdmin);

    customCheck({
        check: isAdmin,
        errorMessage: 'Denied',
        errorCode: 403,
    });

    next();
};
