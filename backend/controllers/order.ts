import { NextFunction, Request, Response } from 'express';
import orderController from 'pdfkit';
import STRIPE, { Stripe } from 'stripe';
import path from 'path';
import fs from 'fs';

import * as config from '../../global/env.json';
import { customCheck } from '../utils/check';
import { Order, IOrder } from '../models/order';
import { User, IUser } from '../models/user';

const stripe = new STRIPE(config.stripe.SK, {
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

export const postOrder = (
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
) => {
    const userId: string = (req as any).userId;
    const stripeToken: string = req.body.stripe_token;

    let certainUser: IUser;
    let products: any;
    let amount: number = 0;
    let metadata: Record<string, string | number | null> = {};
    let prodsForOrder;

    User.findById(userId)
        .then((user: IUser) => {
            customCheck({
                check: !!user,
                errorMessage: `User with id: ${userId} not found.`,
                errorCode: 404,
            });
            certainUser = user;
            return user.populate('cart.items.productId').execPopulate();
        })
        .then((user) => {
            prodsForOrder = user.cart.items.map((i) => {
                return {
                    quantity: i.quantity,
                    product: { ...(i.productId as any)._doc },
                };
            });

            products = user.cart.items;
            amount = 0;

            customCheck({
                check: !!products.length,
                errorMessage: `Your cart is empty!`,
                errorCode: 400,
            });

            products.forEach((p, index) => {
                const key: string = `${index}_item`;
                metadata[
                    key
                ] = `${p.productId.title}: ${p.productId.price}$ x ${p.quantitys}`;
                amount += p.quantity * p.productId.price * 100;
            });

            return stripe.charges.create({
                currency: 'usd',
                amount,
                receipt_email: user.email,
                source: stripeToken,
                metadata,
            });
        })
        .then((res: Stripe.Charge) => {
            const order = new Order({
                user: {
                    email: certainUser.email,
                    userId: certainUser,
                },
                products: prodsForOrder,
            });
            return order.save();
        })
        .then((result) => {
            certainUser.clearCart();
            res.json({ message: 'Success' });
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
