import { body } from 'express-validator';
import express from 'express';
import path from 'path';

import * as adminController from '../controllers/admin';
import { isAdmin } from '../middleware/is-admin';
import { isAuth } from '../middleware/is-auth';

const router = express.Router();

router.post('/grant/:userId', isAuth, isAdmin, adminController.postGrantRole);


// ------------------------------------------------------------
// old

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
    '/add-product',
    [
        body('title').isString().isLength({ min: 3 }).trim(),
        body('price').isFloat(),
        body('description').isLength({ min: 5, max: 400 }).trim(),
    ],
    isAuth,
    adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
    '/edit-product',
    [
        body('title').isString().isLength({ min: 3 }).trim(),
        body('price').isFloat(),
        body('description').isLength({ min: 5, max: 400 }).trim(),
    ],
    isAuth,
    adminController.postEditProduct
);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);

export = router;
