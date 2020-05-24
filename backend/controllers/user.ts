import { NextFunction, Request, Response } from 'express';

import { customCheck } from '../utils/check';
import { User, IUser } from '../models/user';

export const getMeByToken = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const userId: string = (req as any).userId;
    User.findById(userId)
        .select('email isAdmin')
        .then((user: IUser) => {
            customCheck({
                check: !!user,
                errorMessage: `User with id: ${userId} not found.`,
                errorCode: 404,
            });

            res.json({
                user,
            });
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};

export const getUsers = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    User.find()
        .select('email isAdmin _id')
        .then((users: IUser[]) => {
            res.json({
                users,
            });
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};

export const getUserById = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const userId: string = req.params.userId;

    User.findById(userId)
        .select('email isAdmin _id')
        .then((user: IUser) => {
            customCheck({
                check: !!user,
                errorMessage: `User with id: ${userId} not found.`,
                errorCode: 404,
            });

            res.json({
                user,
            });
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};
