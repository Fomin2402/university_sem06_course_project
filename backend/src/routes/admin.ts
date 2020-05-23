import { body } from 'express-validator';
import express from 'express';
import path from 'path';

import * as adminController from '../controllers/admin';
import { isAdmin } from '../middleware/is-admin';
import { isAuth } from '../middleware/is-auth';

// PATH: /admin/*
const router = express.Router();

router.post('/grant/:userId', isAuth, isAdmin, adminController.postGrantRole);
router.post(
    '/product',
    [
        body('title').isString().isLength({ min: 3 }).trim(),
        body('price').isFloat(),
        body('description').isLength({ min: 5, max: 400 }).trim(),
    ],
    isAuth,
    isAdmin,
    adminController.postAddProduct
);

// ------------------------------------------------------------
// old
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
