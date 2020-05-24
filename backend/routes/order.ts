import express, { Router } from 'express';

import * as orderController from '../controllers/order';
import { isAuth } from '../middleware/is-auth';

const router: Router = express.Router();

// PATH: /order/*
router.get('/', isAuth, orderController.getOrders);
router.get('/:orderId', isAuth, orderController.getOrderById);
router.post('/', isAuth, orderController.postOrder);
router.get('/invoice/:orderId', isAuth, orderController.getInvoice);

export = router;
