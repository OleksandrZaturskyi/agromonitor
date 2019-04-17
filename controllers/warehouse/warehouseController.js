const warehouseService = require('../../services/warehouseService');
const services = warehouseService.createService();

class WarehouseController {
    constructor () {}

    handlePost (req, res, next) {
        services.validatePostReqBody(req.body);
        services.postService(req.body)
            .then(() => {
                res.status(201).send('Warehouse successfully created')
            })
            .catch(err => next(err)); 
    }

    handleGet (req, res, next) {
        services.getService(req.params.id)
            .then(result => {
                res.json(result);
            })
            .catch(err => next(err));
    }


    handlePut (req, res, next) {
        services.putService(req.params.id, req.body)
            .then(() => {
                res.send('Warehouse successfully updated');
            })
            .catch(err => next(err));
    }

}

function createController (options) {
    return new WarehouseController(options);
}

module.exports.createController = createController;