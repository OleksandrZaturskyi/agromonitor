const actionsService = require('../../services/actionsService');
const services = actionsService.createService();

class ActionsController {
    constructor () {}

    handlePost (req, res, next) {
        let operationResult = null;

        switch(req.body.action) {
            case 'moveVehicleToField':
                operationResult = services.moveVehicleToField(req.body.vehicleId, req.body.fromId, req.body.toId);
            break;
            case 'moveVehicleToGarage':
                operationResult = services.moveVehicleToGarage(req.body.vehicleId, req.body.fromId, req.body.toId);
            break;
            case "takeGrainFromField":
                operationResult = services.takeGrainFromField(req.body);
            break;
            case "moveGrainToWarehouse":
                operationResult = services.moveGrainToWarehouse(req.body);
            break;
            default:
                let err = new Error('Cannot perform action');
                err.statusCode = 400;
                throw err;
        }
        operationResult.then(result => {
            res.status(200).json({"result": result});
        })
            .catch(err => next(err));
    }
}


function createController (options) {
    return new ActionsController(options);
}

module.exports.createController = createController;