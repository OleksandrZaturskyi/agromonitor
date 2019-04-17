const warehouseService = require('../../services/warehouseService');
const services = warehouseService.createService();

class WarehouseController {
    constructor () {}

    handlePost (req, res, next) {
        services.validatePostReqBody(req.body);
        services.postService(req.body)
            .then(() => {
                res.status(201).send('Successfully created')
            })
            .catch(err => next(err)); 
    }

    handleGet (req, res, next) {
        services.getService(req.params)
            .then(result => {
                res.json(result);
            })
            .catch(err => next(err));
    }

    handleDelete (req, res, next) {
        services.deleteService(req.params)
            .then(() => {
                res.send('Successfully deleted');
            })
            .catch(err => next(err));
    }

    handlePut (req, res, next) {
        services.putService(req.params, req.body)
            .then(() => {
                res.send('Successfully updated');
            })
            .catch(err => next(err));
    }

}

function createController (options) {
    return new WarehouseController(options);
}

module.exports.createController = createController;