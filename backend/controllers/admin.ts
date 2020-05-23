import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { customCheck, checkValidationResult } from '../utils/check';
import { User, IUser } from '../models/user';

export const postGrantRole = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    checkValidationResult(validationResult(req));

    const userId: string = req.params.userId;

    User.findById(userId)
        .then((user: IUser) => {
            customCheck({
                check: !!user,
                errorMessage: 'A user with this id could not be found.',
                errorCode: 404
            });

            (user as any).isAdmin = true;
            return user.save();
        })
        .then((result) => {
            res.status(201).json({
                message: 'User has been granted as admin.',
                userId,
            });
        });
};
