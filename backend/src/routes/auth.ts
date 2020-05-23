import { check, body } from 'express-validator';
import express from 'express';

import * as authController from '../controllers/auth';
import User from '../models/user';

const MIN_PASS_LENGTH: number = 5;

const router = express.Router();

router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email address.')
            .normalizeEmail(),
        body('password', 'Password has to be valid.')
            .isLength({ min: MIN_PASS_LENGTH })
            .isAlphanumeric()
            .trim(),
    ],
    authController.postLogin
);

router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                // if (value === 'test@test.com') {
                //   throw new Error('This email address if forbidden.');
                // }
                // return true;
                return User.findOne({ email: value }).then((userDoc) => {
                    if (userDoc) {
                        return Promise.reject(
                            'E-Mail exists already, please pick a different one.'
                        );
                    }
                });
            })
            .normalizeEmail(),
        body(
            'password',
            'Please enter a password with only numbers and text and at least 5 characters.'
        )
            .isLength({ min: MIN_PASS_LENGTH })
            .isAlphanumeric()
            .trim(),
        body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords have to match!');
                }
                return true;
            }),
    ],
    authController.postSignup
);

router.post('/req-for-reset', authController.postReqForReset);

router.post('/reset', authController.postResetPassword);

export = router;
