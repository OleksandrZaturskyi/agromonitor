const express = require('express');
const vehiclesHandler = require('../controllers/vehicles/vehiclesHandler');

const router = express.Router();
const handler = vehiclesHandler.createHandler();

router.get('/vehicles', (req, res) => {
    handler.handleGet();
    res.send('Hello, world');
});

module.exports = router;