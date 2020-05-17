import { NextFunction, Request, Response } from 'express';

export = (req: Request<any>, res: Response<any>, next: NextFunction) => {
    if (!(req as any).session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}