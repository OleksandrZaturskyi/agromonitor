const model = require('../models/model');
const garageModel = model.createModel('garage');
const fieldsModel = model.createModel('fields');
const vehiclesModel = model.createModel('vehicles');
const warehousesModel = model.createModel('warehouse');


class ActionsService {
    constructor () {}
    async takeGrainFromField (vehicleId, fromId) {
        console.log(vehicleId, fromId);
        const field = await fieldsModel.read(fromId);
        if (field.vehicles.filter(el => el.toString() === vehicleId).length === 0) {
            const err =  new Error ('No such vehicle at this field');
            err.statusCode = 400;
            throw err;
        }
        let grainAtField = field.countOfGrain;
        if (!grainAtField) {
            const err =  new Error ('No grain left');
            err.statusCode = 400;
            throw err;
        }
        const vehicle = await vehiclesModel.read(vehicleId);
        if (vehicle.countOfGetGrain === vehicle.capacity) {
            const err =  new Error ('This vehicle cant take more grain');
            err.statusCode = 400;
            throw err;
        }
        const vehicleCanTake = vehicle.capacity - vehicle.countOfGetGrain;
        if (vehicleCanTake <= grainAtField) {
            grainAtField = grainAtField - vehicleCanTake;
            vehicle.countOfGetGrain = vehicle.countOfGetGrain + vehicleCanTake;
        } else {
            vehicle.countOfGetGrain = vehicle.countOfGetGrain + grainAtField;
            grainAtField = 0;

        }
        await fieldsModel.update(fromId, {"countOfGrain": grainAtField});
        await vehiclesModel.update(vehicleId, vehicle);
        return {
            "message": "Vehicle successfully took grain",
            "grainInVehicle": vehicle.countOfGetGrain,
            "grainLeft": grainAtField
        };

    }
    async moveGrainToWarehouse (vehicleId, fromId, toId) {
        const field = await fieldsModel.read(fromId);
        if (field.vehicles.filter(el => el.toString() === vehicleId).length === 0) {
            const err =  new Error ('No such vehicle at this field');
            err.statusCode = 400;
            throw err;
        }
        let grainInWarehouse = (await warehousesModel.read(toId)).countOfGrain;
        let grainInVehicle = (await vehiclesModel.read(vehicleId)).countOfGetGrain;
        if (grainInVehicle <= 0) {
            let err =  new Error ('This vehicle is empty');
            err.statusCode = 400;
            throw err;
        }
        grainInWarehouse += grainInVehicle;
        await warehousesModel.update(toId, {"countOfGrain": grainInWarehouse});
        await vehiclesModel.update(vehicleId, {"countOfGetGrain": 0});
        return {
            "message": "Grain now in warehouse",
            "grainInWarehouse": grainInWarehouse
        };
    }

    async moveVehicleToField (vehicleId, fromId, toId ) {

        const vehiclesInGarage = (await garageModel.read(fromId)).vehicles;
        const vehiclesOnField = (await fieldsModel.read(toId)).vehicles;
        console.log(vehiclesInGarage.indexOf(vehicleId) );
        try {
            if (vehiclesInGarage.filter(el => el.toString() === vehicleId).length === 0) {
                const err = new Error('Bad request. There is not vehicle with this id in the garage');
                err.statusCode = 400;
                throw err;
            }
            for (let item of vehiclesInGarage) {
                if(item == vehicleId) {
                    vehiclesOnField.push(item);
                    vehiclesInGarage.splice(vehiclesInGarage.indexOf(item), 1);
                    await garageModel.update(fromId, {"vehicles" : vehiclesInGarage});
                    await fieldsModel.update(toId, {"vehicles" : vehiclesOnField});
                    return {"message": "Vehicle now at field"};
                }
            }
        }
        catch(err) {
            throw err;
        }       
    }

    async moveVehicleToGarage (vehicleId, fromId, toId) {
        const vehiclesInGarage = (await garageModel.read(toId)).vehicles;
        const vehiclesOnField = (await fieldsModel.read(fromId)).vehicles;

        try {
            if (vehiclesOnField.filter(el => el.toString() === vehicleId).length === 0) {
                const err = new Error('Bad request. There is not vehicle with this id on the field');
                err.statusCode = 400;
                throw err;
            }
            for (let item of vehiclesOnField) {
                if(item == vehicleId) {
                    vehiclesInGarage.push(item);
                    vehiclesOnField.splice(vehiclesOnField.indexOf(item), 1);
                    await garageModel.update(toId, {"vehicles" : vehiclesInGarage});
                    await fieldsModel.update(fromId, {"vehicles" : vehiclesOnField});
                    return {"message": "Vehicle now in garage"};
                }
            }
        }
        catch(err) {
            throw err;
        }
    }
    
}

module.exports.createService = () => new ActionsService();