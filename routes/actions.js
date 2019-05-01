const express = require('express');
const actionsController = require('../controllers/actions/actionsController');
const router = express.Router();
const controller = actionsController.createController();
const validateReqBody = require('../middlewares/postBodyValidator').validateReqBody;

const requiredFields = ['fromId', 'toId'];
const length = 2;
const requiredTypes = {
    fromId: 'string',
    toId: 'string'
};

router.post('/', validateReqBody(requiredFields, length, requiredTypes));
router.post('/:idVehicle/:action', controller.handlePost);

module.exports = router;