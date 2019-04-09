'use strict';

const express = require('express');
const vehiclesHandler = require('../controllers/vehicles/vehiclesHandler');

const router = express.Router();
const handler = vehiclesHandler.createHandler();

router.post('/vehicles', (req, res) => {
    handler.handlePost(req, res);
});

module.exports = router;