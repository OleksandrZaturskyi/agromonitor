'use strict';

const express = require('express');
const vehiclesHandler = require('../controllers/vehicles/vehiclesHandler');

const router = express.Router();
const handler = vehiclesHandler.createHandler();

router.post('/', (req, res) => {
    handler.handlePost(req, res);
});
router.get('/', (req, res) => {
    console.log(req.url);
    handler.handleGet(req, res);
});
router.get('/:id', (req, res) => {
    console.log(req.url);
    handler.handleGet(req, res);
});

router.put('/:id', (req, res) => {
    handler.handlePut(req, res);
});

router.delete('/:id', (req, res) => {
    handler.handleDelete(req, res);
});
// router.get
// router.put
// router.delete

module.exports = router;