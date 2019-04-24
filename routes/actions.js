const express = require('express');
const actionsController = require('../controllers/actions/actionsController');
const router = express.Router();
const controller = actionsController.createController();
const validateReqBody = require('../middlewares/postBodyValidator').validateReqBody;

const requiredFields = ['action', 'vehicleId', 'fromId', 'toId'];
const length = 4;
const requiredTypes = {
    action: 'string',
    vehicleId: 'string',
    fromId: 'string',
    toId: 'string'
};

router.post('/', validateReqBody(requiredFields, length, requiredTypes));
router.post('/', controller.handlePost);

module.exports = router;