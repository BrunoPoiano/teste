const express = require('express');
const router = express.Router();
import userRoutes from './user';
import regionRoutes from './region';
import * as authController from '../controllers/authController';
import { authMiddleware, userMiddleware } from '../auth';

//Auth
router.get('/login', authController.login);
router.post('/signin', authController.createUser);

//user
router.use('/user', [authMiddleware, userMiddleware], userRoutes);

//region
router.use('/region', [authMiddleware, userMiddleware], regionRoutes);

export default router;
