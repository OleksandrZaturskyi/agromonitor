const model = require('../models/model');
const fieldsModel = model.createModel('fields');
const vehiclesModel = model.createModel('vehicles');
const warehousesModel = model.createModel('warehouses');


class ActionsService {
    constructor () {}
    async takeGrainFromField (data) {
        let grainAtField = (await fieldsModel.read(data.fromId)).countOfGrain;
        if (!grainAtField) {
            let err =  new Error (`{"info": "No grain left", "fieldId": ${data.fromId}}`);
            err.statusCode = 400;
            throw err;
        }
        let vehicle = await vehiclesModel.read(data.vehicleId);
        if (vehicle.countOfGetGrain === vehicle.capacity) {
            let err =  new Error (`{"info": "This vehicle cant take more grain", "vehicleId": ${data.vehicleId}}`);
            err.statusCode = 400;
            throw err;
        }
        let vehicleCanTake = vehicle.capacity - vehicle.countOfGetGrain;
        if (vehicleCanTake <= grainAtField) {
            grainAtField = grainAtField - vehicleCanTake;
            vehicle.countOfGetGrain = vehicle.countOfGetGrain + vehicleCanTake;
        } else {
            vehicle.countOfGetGrain = vehicle.countOfGetGrain + grainAtField;
            grainAtField = 0;

        }
        await fieldsModel.update(data.fromId, {"countOfGrain": grainAtField});
        await vehiclesModel.update(data.vehicleId, vehicle);
        return "Vehicle successfully took grain"

    }
    async moveGrainToWarehouse (data) {
        let grainInWarehouse = (await warehousesModel.read(data.toId)).countOfGrain;
        let grainInVehicle = (await vehiclesModel.read(data.vehicleId)).countOfGetGrain;
        if (grainInVehicle <= 0) {
            let err =  new Error (`{"info": "This vehicle is empty", "vehicleId": ${data.vehicleId}}`);
            err.statusCode = 400;
            throw err;
        }
        grainInWarehouse += grainInVehicle;
        await warehousesModel.update(data.toId, {"countOfGrain": grainInWarehouse});
        await vehiclesModel.update(data.vehicleId, {"countOfGetGrain": 0})

    }
}

function createService (options) {
    return new ActionsService(options);
}

module.exports.createService = createService;