import { body, ValidationChain } from 'express-validator';
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

// ------------------------------------------------------------
// old
router.get('/', isAuth, productController.getEditProduct);
router.get('/:productId', isAuth, productController.getEditProduct);

router.delete('/:productId', isAuth, productController.deleteProduct);

export = router;
