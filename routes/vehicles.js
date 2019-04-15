const express = require('express');
const vehiclesHandler = require('../controllers/vehicles/vehiclesHandler');
const router = express.Router();
const handler = vehiclesHandler.createHandler();
router.post('/', handler.handlePost);
router.get('/', handler.handleGet);
router.get('/:id', handler.handleGet);
router.put('/:id', handler.handlePut);
router.delete('/:id', handler.handleDelete);

module.exports = router;