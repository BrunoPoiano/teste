const express = require('express');
const router = express.Router();
import userRoutes from './user';
import regionRoutes from './region';
import * as authController from '../controllers/authController';
import { userMiddleware } from '../middleware/userMiddleware';
import { userValidator } from '../validator/userValidator';
import { authMiddleware } from '../middleware/authMiddleware';

//Auth
router.post('/login', authController.login);
router.post('/signin', userValidator, authController.createUser);

//user
router.use('/user', [authMiddleware, userMiddleware], userRoutes);

//region
router.use('/region', [authMiddleware, userMiddleware], regionRoutes);

export default router;
