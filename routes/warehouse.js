const express = require('express');
const warehouseController = require('../controllers/warehouse/warehouseController');
const router = express.Router();
const controller = warehouseController.createController();
const validateReqBody = require('../middlewares/postBodyValidator').validateReqBody;

const requiredFields = ['countOfGrain'];
const length = 1;
const requiredTypes = {
    countOfGrain: 'number'
};

router.post('/', validateReqBody(requiredFields, length, requiredTypes));
router.post('/', controller.handlePost);
router.get('/', controller.handleGet);
router.get('/:id', controller.handleGet);
router.put('/:id', validateReqBody(requiredFields, length, requiredTypes));
router.put('/:id', controller.handleUpdate);
router.delete('/:id', controller.handleDelete);


module.exports = router;