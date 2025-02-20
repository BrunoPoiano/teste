const express = require('express');
const router = express.Router();
import * as regionController from '../controllers/regionController';
import { regionValidator } from '../validator/regionValidator';

//crud
router.get('', regionController.getRegion);
router.post('', regionValidator, regionController.createRegion);
router.put('/:id', regionValidator, regionController.updateRegion);
router.delete('/:id', regionController.deleteRegion);

//search
router.get('/find/', regionController.findRegion);
router.get('/find-near/', regionController.findRegionNear);

export default router;
