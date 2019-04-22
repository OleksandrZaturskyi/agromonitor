const express = require('express');
const garageController = require('../controllers/garage/garageController');
const router = express.Router();
const controller = garageController.createController();
const validateReqBody = require('../middlewares/postBodyValidator').validateReqBody;

const length = 0;

router.post('/', validateReqBody(length));
router.post('/', controller.handlePost);
router.get('/', controller.handleGet);
router.get('/:id', controller.handleGet);
router.put('/:id', controller.handlePut);
router.delete('/:id', controller.handleDelete);


module.exports = router;