const express = require('express');
const vehiclesController = require('../controllers/vehicles/vehiclesController');
const router = express.Router();
const controller = vehiclesController.createController();
const validateReqBody = require('../middlewares/postBodyValidator').validateReqBody;
const allowedFieldsValidator = require('../middlewares/allowedFieldsValidator').allowedFieldsValidator;

const requiredFields = ['name', 'capacity', 'countOfGetGrain'];
const length = 3;
const requiredTypes = {
    name: 'string',
    capacity: 'number',
    countOfGetGrain: 'number'
};


router.post('/:garageId', validateReqBody(requiredFields, length, requiredTypes));
router.post('/:garageId', controller.handlePost);
router.get('/', controller.handleGet);
router.get('/:id', controller.handleGet);
router.put('/:id', validateReqBody(requiredFields, length, requiredTypes));
router.put('/:id', controller.handleUpdate);
router.patch('/:id', allowedFieldsValidator(requiredFields));
router.patch('/:id', validateReqBody(null, null, requiredTypes));
router.patch('/:id', controller.handleUpdate);
router.delete('/:id', controller.handleDelete);

module.exports = router;