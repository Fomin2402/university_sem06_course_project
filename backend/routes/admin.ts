import express from 'express';

import * as adminController from '../controllers/admin';
import { isAdmin } from '../middleware/is-admin';
import { isAuth } from '../middleware/is-auth';

// PATH: /admin/*
const router = express.Router();

router.post('/grant/:userId', isAuth, isAdmin, adminController.postGrantRole);

export = router;
