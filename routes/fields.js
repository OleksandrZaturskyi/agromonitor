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

router.post('/', validateReqBody(requiredFields, length, requiredTypes));
router.post('/', controller.handlePost);
router.get('/', controller.handleGet);
router.get('/:id', controller.handleGet);
router.put('/:id', controller.handlePut);
router.delete('/:id', controller.handleDelete);

module.exports = router;