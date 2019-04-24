const express = require('express');
const garageController = require('../controllers/garage/garageController');
const router = express.Router();
const controller = garageController.createController();
const validateReqBody = require('../middlewares/postBodyValidator').validateReqBody;

const requiredFields = ['action', '_id'];
const length = 2;
const requiredTypes = {
    action: 'string',
    _id: 'string'
};
const requiredToUpdate = ['vehicles'];
const updateLength = 1;
const typesToUpdate = {
    vehicles: 'array'
};

router.post('/', validateReqBody(null, 0));
router.post('/', controller.handlePost);
router.get('/', controller.handleGet);
router.get('/:id', controller.handleGet);
router.put('/:id', validateReqBody(requiredToUpdate, updateLength, typesToUpdate));
router.put('/:id', controller.handleUpdate);
router.patch('/:id', validateReqBody(requiredFields, length, requiredTypes));
router.patch('/:id', controller.handleUpdate);
router.delete('/:id', controller.handleDelete);


module.exports = router;