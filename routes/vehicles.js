'use strict';

const express = require('express');
const vehiclesHandler = require('../controllers/vehicles/vehiclesHandler');

const router = express.Router();
const handler = vehiclesHandler.createHandler();

router.post('/', (req, res) => {
    handler.handlePost(req, res);
});
router.get('/', (req, res) => {
    handler.handleGet(req, res);
});
router.get('/:id', (req, res) => {
    handler.handleGet(req, res);
});


router.put('/:id', (req, res) => {
    console.log(req.url);
    handler.handlePut(req, res);
});

router.delete('/:id', (req, res) => {
    handler.handleDelete(req, res);
});

module.exports = router;