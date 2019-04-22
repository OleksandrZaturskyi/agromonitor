const actionsService = require('../../services/actionsService');
const services = actionsService.createService();

class ActionsController {
    constructor () {}

    handlePost (req, res, next) {
        switch(req.body.action) {
            case 'moveVehicleToField':
            services.moveVehicleToField(req.body.vehicleId, req.body.fromId, req.body.toId)
            .then(() => {
                res.status(201).json({"Message": "Successfully performed"});
            })
            .catch(err => next(err));

            case 'moveVehicleToGarage':
            services.moveVehicleToGarage(req.body.vehicleId, req.body.fromId, req.body.toId)
            .then(() => {
                res.status(201).json({"Message": "Successfully performed"});
            })
            .catch(err => next(err));

            case 'takeGrainFromField' :

            case 'moveGrainToWarehouse':

            default:
        }
         
    }
}

function createController (options) {
    return new ActionsController(options);
}

module.exports.createController = createController;