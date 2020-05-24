import { NextFunction, Request, Response } from 'express';

import { customCheck, checkValidationResult } from '../utils/check';
import { Product, IProduct } from '../models/product';
import { Order, IOrder } from '../models/order';
import { User, IUser } from '../models/user';

export const getCart = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const userId: string = (req as any).userId;

    User.findById(userId)
        .then((user: IUser) => {
            customCheck({
                check: !!user,
                errorMessage: `A user with this id: ${userId} could not be found.`,
                errorCode: 404,
            });

            return user.populate('cart.items.productId').execPopulate();
        })
        .then((user: IUser) => {
            const products: IProduct[] = user.cart.items as any;
            res.json({
                products,
            });
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};

export const postCart = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const userId: string = (req as any).userId;
    const prodId: string = req.params.productId;

    let addedProduct: IProduct;

    Product.findById(prodId)
        .then((product: IProduct) => {
            customCheck({
                check: !!product,
                errorMessage: `Product with id: ${prodId} not found.`,
                errorCode: 404,
            });

            addedProduct = product;
            return User.findById(userId);
        })
        .then((user: IUser) => {
            customCheck({
                check: !!user,
                errorMessage: `A user with this id: ${userId} could not be found.`,
                errorCode: 404,
            });

            return user.addToCart(addedProduct);
        })
        .then((result) => {
            res.json({
                result,
            });
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};

export const deleteItemFromCart = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const userId: string = (req as any).userId;
    const prodId: string = req.params.productId;

    User.findById(userId)
        .then((user: IUser) => {
            customCheck({
                check: !!user,
                errorMessage: `A user with this id: ${userId} could not be found.`,
                errorCode: 404,
            });

            return user.removeFromCart(prodId);
        })
        .then((result) => {
            res.json({
                result,
            });
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};
