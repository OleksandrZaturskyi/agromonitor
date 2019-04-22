const vehiclesService = require('../../services/vehicleService');
const services = vehiclesService.createService('vehicles');


class VehiclesController {
    constructor () {}

    handlePost (req, res, next) {
        services.postService(req.body, "5cbc5722f1cfbe3388c0d39c")
            .then(result => {
                res.status(201).json({"Message": "Successfully created", "Item": result.ops[0]})
            })
            .catch(err => next(err));
    }

    handleGet (req, res, next) {
        services.getService(req.params.id)
            .then(result => {
                res.json({"Message": "Data get is successful", "Data": result});
            })
            .catch(err => next(err));
    }

    handleDelete (req, res, next) {
        services.deleteService(req.params.id)
            .then(() => {
                res.json({"Message": "successfully deleted", "_id": req.params.id});
            })
            .catch(err => next(err));
    }

    handlePut (req, res, next) {
        services.putService(req.params.id, req.body)
            .then(()  => {
                res.json({"Message": "successfully updated", "_id": req.params.id, "updated fields": req.body});
            })
            .catch(err => next(err));
    }
}

function createController (options) {
    return new VehiclesController(options);
}

module.exports.createController = createController;