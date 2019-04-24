const express = require('express');
const vehiclesController = require('../controllers/vehicles/vehiclesController');
const router = express.Router();
const controller = vehiclesController.createController();
const validateReqBody = require('../middlewares/postBodyValidator').validateReqBody;

const requiredFields = ['name', 'capacity', 'countOfGetGrain'];
const length = 3;
const requiredTypes = {
    name: 'string',
    capacity: 'number',
    countOfGetGrain: 'number'
};

router.post('/', validateReqBody(requiredFields, length, requiredTypes));
router.post('/', controller.handlePost);
router.get('/', controller.handleGet);
router.get('/:id', controller.handleGet);
router.put('/:id', validateReqBody(requiredFields, length, requiredTypes));
router.put('/:id', controller.handlePut);
router.delete('/:id', controller.handleDelete);

module.exports = router;