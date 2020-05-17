import PDFDocument from'pdfkit';
import STRIPE from'stripe';
import path from'path';
import fs from'fs';

import Product from '../models/product';
import Order from '../models/order';

// TODO: update stripe key
const stripe = new STRIPE(
  'sk_test_Flc1Upp19T0q8ZgmKGDVJUI400j9emUSTr',
  {
    apiVersion: null,
    typescript: true
  }
);

const ITEMS_PER_PAGE = 2;

export const getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product.find()
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
      res.json({
        products,
        count: totalItems,
        currentPage: page,
      });
    })
    .catch(err => {
      const error = new Error(err);
      (error as any).httpStatusCode = 500;
      return next(error);
    });
};

export const getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.json({
        product
      });
    })
    .catch(err => {
      const error = new Error(err);
      (error as any).httpStatusCode = 500;
      return next(error);
    });
};

export const getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.json({
        products
      });
    })
    .catch(err => {
      const error = new Error(err);
      (error as any).httpStatusCode = 500;
      return next(error);
    });
};

export const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.json({
        result
      })
    })
    .catch(err => {
      const error = new Error(err);
      (error as any).httpStatusCode = 500;
      return next(error);
    });
};

export const postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.json({
        result
      });
    })
    .catch(err => {
      const error = new Error(err);
      (error as any).httpStatusCode = 500;
      return next(error);
    });
};

// TODO: udpate that
export const getCheckout = (req, res, next) => {
  let products;
  let total = 0;
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      products = user.cart.items;
      total = 0;
      products.forEach(p => {
        total += p.quantity * p.productId.price;
      });

      return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: products.map(p => {
          return {
            name: p.productId.title,
            description: p.productId.description,
            amount: p.productId.price * 100,
            currency: 'usd',
            quantity: p.quantity
          };
        }),
        success_url: req.protocol + '://' + req.get('host') + '/checkout/success', // => http://localhost:3000
        cancel_url: req.protocol + '://' + req.get('host') + '/checkout/cancel'
      });
    })
    .then(session => {
      res.josn({
        products,
        totalSum: total,
        sessionId: session.id
      });
    })
    .catch(err => {
      const error = new Error(err);
      (error as any).httpStatusCode = 500;
      return next(error);
    });
};

export const getCheckoutSuccess = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.status().end({msg: 'Success'})
    })
    .catch(err => {
      const error = new Error(err);
      (error as any).httpStatusCode = 500;
      return next(error);
    });
};

export const getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.json(
        {
        orders
      });
    })
    .catch(err => {
      const error = new Error(err);
      (error as any).httpStatusCode = 500;
      return next(error);
    });
};

export const getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then((order: any) => {
      if (!order) {
        return next(new Error('No order found.'));
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error('Unauthorized'));
      }
      const invoiceName = 'invoice-' + orderId + '.pdf';
      const invoicePath = path.join('data', 'invoices', invoiceName);

      const pdfDoc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'inline; filename="' + invoiceName + '"'
      );
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(26).text('Invoice', {
        underline: true
      });
      pdfDoc.text('-----------------------');
      let totalPrice = 0;
      order.products.forEach(prod => {
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
    .catch(err => next(err));
};
