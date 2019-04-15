const vehicleService = require('../../services/vehicleService');
const services = vehicleService.createService();

class VehiclesController {
    constructor () {}

    handlePost (req, res, next) {
        services.postService(req.body)
            .then(result => {
                if (result) {
                    res.status(201).send('Successfully created')
                } else {
                    res.status(400).send('Not created')
                }
            })
            .catch(err => next(err));
    }

    handleGet (req, res, next) {
        services.getService(req.params)
            .then(result => {
                if (result) {
                    res.json(result);
                } else {
                    res.status(404).send('Data not found')
                }
            })
            .catch(err => next(err));
    }

    handleDelete (req, res, next) {
        services.deleteService(req.params)
            .then(result => {
                if (result) {
                    res.send('Successfully deleted');
                } else {
                    res.status(404).send('Data not found')
                }
            })
            .catch(err => next(err));
    }

    handlePut (req, res, next) {
        services.putService(req.params, req.body)
            .then(result => {
                if (result) {
                    res.send('Successfully updated');
                } else {
                    res.status(404).send('Data not found')
                }
            })
            .catch(err => next(err));
    }

}

function createController (options) {
    return new VehiclesController(options);
}

module.exports.createController = createController;