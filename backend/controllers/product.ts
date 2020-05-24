import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import * as fileHelper from '../utils/file';
import { customCheck, checkValidationResult } from '../utils/check';
import { Product, IProduct } from '../models/product';

export const getProducts = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    Product.find()
        .then((products: IProduct[]) => {
            customCheck({
                check: !!products,
                errorMessage: 'Products not found.',
                errorCode: 404,
            });

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

export const getProductById = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const prodId: string = req.params.productId;
    Product.findById(prodId)
        .then((product: IProduct) => {
            customCheck({
                check: !!product,
                errorMessage: `Product with id: ${prodId} not found.`,
                errorCode: 404,
            });

            res.json({
                product,
            });
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};

export const postProduct = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    checkValidationResult(validationResult(req));

    const title: string = req.body.title;
    const price: number = +req.body.price;
    const description: string = req.body.description;
    const image = req.file;

    customCheck({
        check: !!image,
        errorMessage: 'Attached file is not an image.',
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

export const patchProduct = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    checkValidationResult(validationResult(req));

    const prodId: string = req.params.productId;

    const updatedTitle: string = req.body.title;
    const updatedPrice: number = req.body.price;
    const updatedDesc: string = req.body.description;
    const image = req.file || req.body.removeImage;

    console.log('prodId');
    console.log(prodId);

    Product.findById(prodId)
        .then((product: IProduct) => {
            customCheck({
                check: !!product,
                errorMessage: 'A product with this id could not be found.',
                errorCode: 404,
            });

            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;

            console.log('image');
            console.log(image);

            if (image || typeof image === 'string') {
                const currentImage: string | undefined = product.imageUrl;

                if (currentImage) {
                    fileHelper.deleteFile(product.imageUrl);
                }

                if (image && image.path) {
                    product.imageUrl = image.path;
                } else {
                    product.imageUrl = undefined;
                }
            }

            return product.save();
        })
        .then((product: IProduct) => {
            return res.json(product);
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};

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

            if (product.imageUrl) {
                fileHelper.deleteFile(product.imageUrl);
            }

            // TODO: check if it delete from cart too
            return Product.deleteOne({
                _id: prodId,
                userId: (req as any).userId,
            });
        })
        .then(() => {
            res.status(200).json({ message: 'Success!' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Deleting product failed.' });
        });
};
