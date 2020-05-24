import { body, ValidationChain, param } from 'express-validator';
import express from 'express';

import * as productController from '../controllers/product';
import { isAdmin } from '../middleware/is-admin';
import { isAuth } from '../middleware/is-auth';

const productExpresssions: ValidationChain[] = [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 400 }).trim(),
];

// PATH: /product/*
const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:productId', productController.getProductById);

router.post(
    '/',
    productExpresssions,
    isAuth,
    isAdmin,
    productController.postProduct
);

router.patch(
    '/:productId',
    productExpresssions,
    isAuth,
    isAdmin,
    productController.patchProduct
);

router.delete('/:productId', isAuth, isAdmin, productController.deleteProduct);

export = router;
