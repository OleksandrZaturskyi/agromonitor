const garageService = require('../../services/garageService');
const services = garageService.createService();

class GarageController {
    constructor () {}

    handlePost (req, res, next) {
        services.postService(req.body)
        .then(result => {
            res.status(201).json({"Message": "Successfully created", "Item": result.ops[0]});
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
                res.send('Garage successfully updated');
            })
            .catch(err => next(err));
    }

    handleDelete (req, res, next) {
        services.deleteService(req.params.id)
            .then(result => {
                res.json(result);
            })
            .catch(err => next(err));
    }

}

function createController (options) {
    return new GarageController(options);
}

module.exports.createController = createController;