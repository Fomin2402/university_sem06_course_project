// TODO: add cursor pagination!!!
// TODO: added search to main page for products
// TODO: added rating to products

import bodyParser from 'body-parser';
import { Express } from 'express';
import mongoose from 'mongoose';
import express from 'express';
import multer from 'multer';
import path from 'path';

import * as config from '../global/env.json';

import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import producRoutes from './routes/product';
import cartRoutes from './routes/cart';

// TODO: old route
import shopRoutes from './routes/shop';

import rootDir from './utils/path';

const MONGODB_URI: string = config.atlas.connection;

const app: Express = express();

const fileStorage = multer.diskStorage({
    destination: (
        req: Express.Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) => {
        cb(null, 'images');
    },
    filename: (
        req: Express.Request,
        file: Express.Multer.File,
        cb: (error: Error, filename: string) => void
    ) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});

const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// tslint:disable-next-line: deprecation
app.use(bodyParser.urlencoded({ extended: false }));
// tslint:disable-next-line: deprecation
app.use(bodyParser.json());

app.use(multer({ storage: fileStorage, fileFilter }).single('image'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    next();
});

app.use('/blablabla', (req, res, next) => {
    res.end('blablabla');
});

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use('/product', producRoutes);
app.use('/cart', cartRoutes);

// TODO: old route
app.use(shopRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(config.backend.port);
        console.log(`App is running: http://localhost:${config.backend.port}/`);
    })
    .catch((err) => {
        console.log(err);
    });
