const express = require('express');
const vehiclesController = require('../controllers/vehicles/vehiclesController');
const router = express.Router();
const controller = vehiclesController.createController();

router.post('/', controller.handlePost);
router.get('/', controller.handleGet);
router.get('/:id', controller.handleGet);
router.put('/:id', controller.handlePut);
router.delete('/:id', controller.handleDelete);

module.exports = router;