const express = require('express');
const router = express.Router();
import * as userController from '../controllers/userController';

router.get('', userController.loggedUser);
router.put('', userController.updateUser);
router.delete('', userController.deleteUser);
router.get('/teste-user', userController.createTesteUser);

export default router;
