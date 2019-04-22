const express = require('express');
const actionsController = require('../controllers/actions/actionsController');
const router = express.Router();
const controller = actionsController.createController();
const validateReqBody = require('../middlewares/postBodyValidator').validateReqBody;

const requiredFields = ['action', 'vehicleId', 'from', 'fromId', 'to', 'toId'];
const length = 6;
const requiredTypes = {
    action: 'string',
    vehicleId: 'string',
    from: 'string',
    fromId: 'string',  
    to: 'string',
    toId: 'string'
};

router.post('/', validateReqBody(requiredFields, length, requiredTypes));
router.post('/', controller.handlePost);

module.exports = router;