const vehicleService = require('../../services/vehicleService');

const services = vehicleService.createService();

class VehiclesController {
    constructor () {}

    handlePost (req, res) {
        services.postService(req.body)
            .then(result => {
                if (result) {
                    res.status(201).send('Successfully created')
                } else {
                    res.status(400).send('Not created')
                }
            });
    }

    handleGet (req, res) {
        services.getService(req.params)
            .then(result => {
                if (result) {
                    res.json(result);
                } else {
                    res.status(404).send('Data not found')
                }
            });
    }

    handleDelete (req, res) {
        services.deleteService(req.params)
            .then(result => {
                if (result) {
                    res.send('Successfully deleted');
                } else {
                    res.status(404).send('Data not found')
                }
            });
    }

    handlePut (req, res) {
        services.putService(req.params, req.body)
            .then(result => {
                if (result) {
                    res.send('Successfully updated');
                } else {
                    res.status(404).send('Data not found')
                }
            })
    }

}

function createController (options) {
    return new VehiclesController(options);
}

module.exports.createController = createController;