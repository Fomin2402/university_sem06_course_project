import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import * as config from '../../global/env.json';

export const isAuth = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const authHeader: string | undefined = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('Not authenticated.');
        (error as any).statusCode = 401;
        throw error;
    }

    const token: string | undefined = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.backend.jwt.jsonwebtoken);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        (error as any).statusCode = 401;
        throw error;
    }
    (req as any).userId = decodedToken.userId;
    (req as any).isAdmin = decodedToken.isAdmin;
    next();
};
