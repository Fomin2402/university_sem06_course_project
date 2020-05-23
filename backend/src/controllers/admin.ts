import { validationResult, Result, ValidationError } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

import * as fileHelper from '../utils/file';
import { customCheck } from '../utils/check';
import { Product, IProduct } from '../models/product';
import { User, IUser } from '../models/user';

export const postGrantRole = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const errors: Result<ValidationError> = validationResult(req);
    customCheck({
        check: errors.isEmpty(),
        errorMessage: 'Validation failed.',
        errorCode: 422,
        data: errors.array(),
    });

    const userId: string = req.params.userId;

    User.findById(userId)
        .then((user: IUser) => {
            customCheck({
                check: !!user,
                errorMessage: 'A user with this id could not be found.',
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

export const postAddProduct = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const errors = validationResult(req);

    const title: string = req.body.title;
    const price: number = +req.body.price;
    const description: string = req.body.description;
    const image = req.file;

    customCheck({
        check: !!image,
        errorMessage: 'Attached file is not an image.',
        errorCode: 422,
    });

    customCheck({
        check: errors.isEmpty(),
        errorMessage: errors.array()[0]?.msg,
        data: errors.array(),
        errorCode: 422,
    });

    const imageUrl = image.path;

    const product = new Product({
        title,
        price,
        description,
        imageUrl,
        userId: (req as any).userId,
    });

    product
        .save()
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};

// TODO: udpate later
export const getEditProduct = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product) => {
            if (!product) {
                return res.redirect('/');
            }
            res.json({
                product,
                errorMessage: null,
                validationErrors: [],
            });
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};

// TODO: udpate later
export const postEditProduct = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const image = req.file;
    const updatedDesc = req.body.description;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errorMessage: errors.array()[0]?.msg,
            validationErrors: errors.array(),
        });
    }

    Product.findById(prodId)
        .then((product: any) => {
            if (
                product.userId.toString() !== (req as any).user._id.toString()
            ) {
                // TODO: check status code here
                return res.status(201).end();
            }
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            if (image) {
                fileHelper.deleteFile(product.imageUrl);
                product.imageUrl = image.path;
            }
            return product.save().then((result) => {
                res.json({ result });
            });
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};

// TODO: udpate later
export const deleteProduct = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const prodId = req.params.productId;

    Product.findById(prodId)
        .then((product: IProduct) => {
            customCheck({
                check: !!product,
                errorMessage: 'Product not found.',
                errorCode: 404,
            });

            fileHelper.deleteFile(product.imageUrl);

            // TODO: update delete query
            return Product.deleteOne({
                _id: prodId,
                userId: (req as any).user._id,
            });
        })
        .then(() => {
            res.status(200).json({ message: 'Success!' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Deleting product failed.' });
        });
};
