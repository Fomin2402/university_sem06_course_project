import { Express, RequestHandler } from 'express';

// TODO: add cursor pagination!!!

import MongoDBStoreConnect from 'connect-mongodb-session';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'connect-flash';
import mongoose from 'mongoose';
import express from 'express';
import multer from 'multer';
import csrf from 'csurf';
import path from 'path';

import * as config from '../../global/env.json';

import * as errorController from'./controllers/error';
import adminRoutes from'./routes/admin';
import shopRoutes from'./routes/shop';
import authRoutes from'./routes/auth';

import User from './models/user';
import rootDir from './utils/path';

const MongoDBStoreS = MongoDBStoreConnect(session);


const MONGODB_URI: string = config.atlas.connection;

const app: Express = express();

const store = new MongoDBStoreS({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const csrfProtection: RequestHandler = csrf();

const pathToImagesDestination: string = path.join(rootDir, '..', '..', 'images')

const fileStorage = multer.diskStorage({
  destination: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, pathToImagesDestination);
  },
  filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error, filename: string) => void) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
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

/*
TODO: remove below
*/
app.set('view engine', 'ejs');
app.set('views', 'views');

// tslint:disable-next-line: deprecation
app.use(bodyParser.urlencoded({ extended: false }));
// tslint:disable-next-line: deprecation
app.use(bodyParser.json());

app.use(
  multer({ storage: fileStorage, fileFilter }).single('image')
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(pathToImagesDestination));

// TODO: udpate session secret
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      (req as any).user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn,
  });
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
