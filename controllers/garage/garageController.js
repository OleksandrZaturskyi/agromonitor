const garageService = require('../../services/garageService');
const services = garageService.createService();

class GarageController {
    constructor () {}

    async handlePost (req, res, next) {
        try {
            const result = await services.postService(req.body);
            res.status(201).json({"Message": "Successfully created", "Item": result.ops[0]});
        } catch (err) {
            next(err);
        }
    }

    async handleGet (req, res, next) {
        try {
            const result = await services.getService(req.params.id, req.query.action);
            res.json({"Message": "Data get is successful", "data": result});
        } catch (err) {
            next(err);
        }
    }

    async handleDelete (req, res, next) {
        try {
            const result = await services.deleteService(req.params.id);
            res.json({"Message": "Successfully deleted", "result": result});
        } catch (err) {
            next(err);
        }
    }

    async handleUpdate (req, res, next) {
        try {
            const result = await services.updateService(req.params.id, req.body);
            res.json({"Message": "Garage successfully updated", "result": result});
        } catch (err) {
            next(err);
        }
    }
}

module.exports.createController = () => new GarageController();