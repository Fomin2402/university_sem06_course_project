import express, { Router } from 'express';

import * as userController from '../controllers/user';
import { isAuth } from '../middleware/is-auth';
import { isAdmin } from '../middleware/is-admin';

const router: Router = express.Router();

// PATH: /user/*
router.get('/me', isAuth, userController.getMeByToken);

router.get('/', isAuth, isAdmin, userController.getUsers);
router.get('/:userId', isAuth, isAdmin, userController.getUserById);

export = router;
