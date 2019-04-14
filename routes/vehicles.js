'use strict';

const express = require('express');
const vehiclesController = require('../controllers/vehicles/vehiclesController');

const router = express.Router();
const controller = vehiclesController.createController();

router.post('/', (req, res) => {
    controller.handlePost(req, res);
});
router.get('/', (req, res) => {
    controller.handleGet(req, res);
});
router.get('/:id', (req, res) => {
    controller.handleGet(req, res);
});
router.put('/:id', (req, res) => {
    controller.handlePut(req, res);
});
router.delete('/:id', (req, res) => {
    controller.handleDelete(req, res);
});

module.exports = router;