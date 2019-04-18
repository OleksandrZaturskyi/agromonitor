const express = require('express');
const garageController = require('../controllers/garage/garageController');
const router = express.Router();
const controller = garageController.createController();
const validateReqBody = require('../middlewares/postBodyValidator').validateReqBody;

const requiredFields = ['vehicles'];
const length = 1;
const requiredTypes = {
    vehicles: 'object'
};

router.post('/', validateReqBody(requiredFields, length, requiredTypes));
router.post('/', controller.handlePost);
router.get('/', controller.handleGet);
router.get('/:id', controller.handleGet);
router.put('/:id', controller.handlePut);


module.exports = router;