const express = require('express');
const router = express.Router();
import * as regionController from '../controllers/regionController';

router.get('', regionController.getRegion);
router.post('', regionController.createRegion);
router.put('/:id', regionController.updateRegion);
router.delete('/:id', regionController.deleteRegion);

export default router;
