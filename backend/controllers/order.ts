import { NextFunction, Request, Response } from 'express';
import orderController from 'pdfkit';
import STRIPE from 'stripe';
import path from 'path';
import fs from 'fs';

import { customCheck } from '../utils/check';
import { Order, IOrder } from '../models/order';
import { User, IUser } from '../models/user';

// TODO: update stripe key
const stripe = new STRIPE('sk_test_CrxFLdz8NPTC8EIpXVbPQoA1000HfoGTlO', {
    apiVersion: null,
});

export const getOrders = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const userId: string = (req as any).userId;

    Order.find({ 'user.userId': userId })
        .then((orders: IOrder[]) => {
            res.json({
                orders,
            });
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};

export const getOrderById = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const userId: string = (req as any).userId;
    const orderId: string = req.params.orderId;

    Order.findOne({ _id: orderId, 'user.userId': userId })
        .then((order: IOrder) => {
            customCheck({
                check: !!order,
                errorMessage: `Order with id: ${orderId} not found.`,
                errorCode: 404,
            });

            res.json({
                order,
            });
        })
        .catch((err) => {
            const error = new Error(err);
            (error as any).httpStatusCode = 500;
            return next(error);
        });
};

// TODO: udpate post order when frontend logic will be completed
export const postOrder = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const userId: string = (req as any).userId;

    let products: any;
    let total: number = 0;

    User.findById(userId)
        .then((user: IUser) => {
            customCheck({
                check: !!user,
                errorMessage: `User with id: ${userId} not found.`,
                errorCode: 404,
            });

            return user.populate('cart.items.productId').execPopulate();
        })
        .then((user) => {
            products = user.cart.items;
            total = 0;

            customCheck({
                check: !!products.length,
                errorMessage: `Your cart is empty!`,
                errorCode: 400,
            });

            products.forEach((p) => {
                total += p.quantity * p.productId.price;
            });

            // TOOD: change logic to make charge on back
            return stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: products.map((p) => {
                    return {
                        name: p.productId.title,
                        description: p.productId.description,
                        amount: p.productId.price * 100,
                        currency: 'usd',
                        quantity: p.quantity,
                    };
                }),
                success_url:
                    req.protocol +
                    '://' +
                    req.get('host') +
                    '/checkout/success', // => http://localhost:3000
                cancel_url:
                    req.protocol + '://' + req.get('host') + '/checkout/cancel',
            });
        })
        .then((session) => {
            res.json({
                path: '/checkout',
                pageTitle: 'Checkout',
                products,
                totalSum: total,
                sessionId: session.id,
            });
        })
        .catch((err) => {
            const error = new Error(err);
            return next(error);
        });
};

export const getInvoice = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const userId: string = (req as any).userId;
    const orderId: string = req.params.orderId;

    Order.findById(orderId)
        .then((order: IOrder) => {
            customCheck({
                check: !!order,
                errorMessage: `Order with id: ${orderId} not found.`,
                errorCode: 404,
            });

            customCheck({
                check: order.user.userId.toString() === userId,
                errorMessage: `Forbidden`,
                errorCode: 403,
            });

            const invoiceName: string = 'invoice-' + orderId + '.pdf';
            const invoicePath: string = path.join(
                'data',
                'invoices',
                invoiceName
            );

            const pdfDoc: orderController = new orderController();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
                'Content-Disposition',
                'inline; filename="' + invoiceName + '"'
            );
            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            pdfDoc.pipe(res);

            pdfDoc.fontSize(26).text('Invoice', {
                underline: true,
            });
            pdfDoc.text('-----------------------');
            let totalPrice = 0;
            order.products.forEach((prod) => {
                totalPrice += prod.quantity * prod.product.price;
                pdfDoc
                    .fontSize(14)
                    .text(
                        prod.product.title +
                            ' - ' +
                            prod.quantity +
                            ' x ' +
                            '$' +
                            prod.product.price
                    );
            });
            pdfDoc.text('---');
            pdfDoc.fontSize(20).text('Total Price: $' + totalPrice);

            pdfDoc.end();
        })
        .catch((err) => next(err));
};
