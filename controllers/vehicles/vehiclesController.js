<<<<<<< HEAD
const vehiclesService = require('../../services/vehiclesService');
const services = vehiclesService.createService('vehicles');
=======
const vehicleService = require('../../services/vehicleService');
const services = vehicleService.createService();
>>>>>>> develop

class VehiclesController {
    constructor () {}

    handlePost (req, res, next) {
<<<<<<< HEAD
        services.postService(req.body)
            .then(() => {
                res.status(201).send('Vehicle  successfully created')
=======
        services.postService(req.body, "5cb8a40ce3ebd010a41e51ae")
            .then(result => {
                res.status(201).json({"Message": "Successfully created", "Item": result.ops[0]})
>>>>>>> develop
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
<<<<<<< HEAD
                res.send('Vehicle successfully deleted');
=======
                res.json({"Message": "successfully deleted", "_id": req.params.id});
>>>>>>> develop
            })
            .catch(err => next(err));
    }

    handlePut (req, res, next) {
<<<<<<< HEAD
        services.putService(req.params.id, req.query, req.body)
            .then(() => {
                res.send('Vehicle successfully updated');
=======
        services.putService(req.params.id, req.body)
            .then(()  => {
                res.json({"Message": "successfully updated", "_id": req.params.id, "updated fields": req.body});
>>>>>>> develop
            })
            .catch(err => next(err));
    }
}

function createController (options) {
    return new VehiclesController(options);
}

module.exports.createController = createController;