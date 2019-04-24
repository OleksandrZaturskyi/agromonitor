const vehiclesService = require('../../services/vehicleService');
const services = vehiclesService.createService('vehicles');


class VehiclesController {
    constructor () {}

    async handlePost (req, res, next) {
        try {
            const result = await services.postService(req.body, "5cbee042c65be011986cf8bf");
            res.status(201).json({"Message": "Successfully created", "Item": result.ops[0]});
        } catch (err) {
            next(err);
        }
    }

    async handleGet (req, res, next) {
        try {
            const result = await services.getService(req.params.id);
            res.json({"Message": "Data get is successful", "Data": result});
        } catch (err) {
            next(err);
        }
    }

    async handleDelete (req, res, next) {
        try {
            const result = await services.deleteService(req.params.id);
            res.json({"Message": "successfully deleted", "_id": result});
        } catch (err) {
            next (err);
        }
    }

    async handlePut (req, res, next) {
        try {
            const result = await services.putService(req.params.id, req.body);
            res.json({"Message": "successfully updated", "updated fields": req.body, "result": result});
        } catch (err) {
            next(err);
        }
    }
}

module.exports.createController = () =>  new VehiclesController();