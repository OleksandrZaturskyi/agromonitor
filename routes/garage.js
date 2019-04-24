const express = require('express');
const garageController = require('../controllers/garage/garageController');
const router = express.Router();
const controller = garageController.createController();
const validateReqBody = require('../middlewares/postBodyValidator').validateReqBody;

const requiredFields = ['action', '_id'];
const length = 0;
const updateLength = 2;
const requiredTypes = {
    action: 'string',
    _id: 'string'
};

router.post('/', validateReqBody(null, length));
router.post('/', controller.handlePost);
router.get('/', controller.handleGet);
router.get('/:id', controller.handleGet);
router.put('/:id', validateReqBody(requiredFields, updateLength, requiredTypes));
router.put('/:id', controller.handlePut);
router.delete('/:id', controller.handleDelete);


module.exports = router;