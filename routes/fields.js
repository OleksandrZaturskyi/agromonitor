const express = require('express');
const fieldsController = require('../controllers/fields/fieldsController');
const router = express.Router();
const controller = fieldsController.createController();
const validateReqBody = require('../middlewares/postBodyValidator').validateReqBody;

const requiredFields = ['countOfGrain', 'vehicles'];
const length = 2;
const requiredTypes = {
    countOfGrain: 'number',
    vehicles: 'object'
};

router.post('/', validateReqBody(requiredFields, length, requiredTypes));
router.post('/', controller.handlePost);
router.get('/', controller.handleGet);
router.get('/:id', controller.handleGet);
router.put('/:id', controller.handlePut);
router.delete('/:id', controller.handleDelete);

module.exports = router;