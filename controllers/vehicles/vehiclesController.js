const vehicleService = require('../../services/vehicleService');
const services = vehicleService.createService();

class VehiclesController {
    constructor () {}

    handlePost (req, res, next) {
        services.validatePostReqBody(req.body);
        services.postService(req.body)
            .then(() => {
                res.status(201).send('Vehicle successfully created')
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

    handleDelete (req, res, next) {
        services.deleteService(req.params.id)
            .then(() => {
                res.send('Vehicle successfully deleted');
            })
            .catch(err => next(err));
    }

    handlePut (req, res, next) {
        services.putService(req.params.id, req.body)
            .then(() => {
                res.send('Vehicle successfully updated');
            })
            .catch(err => next(err));
    }

}

function createController (options) {
    return new VehiclesController(options);
}

module.exports.createController = createController;