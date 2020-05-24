import express, { Router } from 'express';

import * as cartController from '../controllers/cart';
import { isAuth } from '../middleware/is-auth';

const router: Router = express.Router();

// PATH: /cart/*
router.get('/', isAuth, cartController.getCart);
router.post('/:productId', isAuth, cartController.postCart);
router.delete('/:productId', isAuth, cartController.deleteItemFromCart);

export = router;
