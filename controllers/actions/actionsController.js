const actionsService = require('../../services/actionsService');
const services = actionsService.createService();

class ActionsController {
    constructor () {}

    async handlePost (req, res, next) {
        let operationResult = null;
        switch(req.body.action) {
            case 'moveVehicleToField':
                operationResult = services.moveVehicleToField(req.body.vehicleId, req.body.fromId, req.body.toId);
            break;
            case 'moveVehicleToGarage':
                operationResult = services.moveVehicleToGarage(req.body.vehicleId, req.body.fromId, req.body.toId);
            break;
            case "takeGrainFromField":
                operationResult = services.takeGrainFromField(req.body.vehicleId, req.body.fromId);
            break;
            case "moveGrainToWarehouse":
                operationResult = services.moveGrainToWarehouse(req.body.vehicleId, req.body.fromId, req.body.toId);
            break;
        }
        try {
            if (!operationResult) {
                const err = new Error('Not allowed action');
                err.statusCode = 400;
                throw err;
            }
            const result = await operationResult;
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports.createController = () => new ActionsController();