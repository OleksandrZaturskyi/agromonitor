const express = require('express');
const fieldsController = require('../controllers/fields/fieldsController');
const router = express.Router();
const controller = fieldsController.createController();
const validateReqBody = require('../middlewares/postBodyValidator').validateReqBody;

const requiredFields = ['countOfGrain'];
const length = 1;
const requiredTypes = {
    countOfGrain: 'number',
};
const requiredToPut = ['countOfGrain', 'vehicles'];
const putLength = 2;
const typesToPut = {
    countOfGrain: 'string',
    vehicles: 'array'
};
const requiredToPatch = ['action', '_id'];
const patchLength = 2;
const typesToPatch = {
    action: 'string',
    _id: 'string'
};

router.post('/', validateReqBody(requiredFields, length, requiredTypes));
router.post('/', controller.handlePost);
router.get('/', controller.handleGet);
router.get('/:id', controller.handleGet);
router.put('/:id', validateReqBody(requiredToPut, putLength, typesToPut));
router.put('/:id', controller.handleUpdate);
router.patch('/:id', validateReqBody(requiredToPatch, patchLength, typesToPatch));
router.patch('/:id', controller.handleUpdate);
router.delete('/:id', controller.handleDelete);

module.exports = router;