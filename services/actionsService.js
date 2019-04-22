const mongo = require('mongodb');
const model = require('../models/model');
const garageModel = model.createModel('garage');
const fieldsModel = model.createModel('fields');


class ActionsService {
    constructor () {}

    async moveVehicleToField (vehicleId, fromId, toId ) {
        let vehiclesInGarage = (await garageModel.read(fromId)).vehicles;
        let vehiclesOnField = (await fieldsModel.read(toId)).vehicles;

        try {
            for (let item of vehiclesInGarage) {
                if(item == vehicleId) {
                    vehiclesOnField.push(item);
                    vehiclesInGarage.splice(vehiclesInGarage.indexOf(item), 1);
                    return garageModel.update(fromId, {"vehicles" : vehiclesInGarage}), 
                    fieldsModel.update(toId, {"vehicles" : vehiclesOnField});
                }
            }
        }
        catch(err) {
        err = new Error('Bad request. There is not vehicle with this id in the garage');
        err.statusCode = 400;
        throw err;
        }
            
    }

    async moveVehicleToGarage (vehicleId, fromId, toId) { 
        let vehiclesInGarage = (await garageModel.read(toId)).vehicles;
        let vehiclesOnField = (await fieldsModel.read(fromId)).vehicles;

        try {
            for (let item of vehiclesOnField) {
                if(item == vehicleId) {
                    vehiclesInGarage.push(item);
                    vehiclesOnField.splice(vehiclesOnField.indexOf(item), 1);
                    return garageModel.update(fromId, {"vehicles" : vehiclesInGarage}), 
                    fieldsModel.update(toId, {"vehicles" : vehiclesOnField});
                }
            }
        }
        catch(err) {
        err = new Error('Bad request. There is not vehicle with this id on the field');
        err.statusCode = 400;
        throw err;
        }
    }
    
    async takeGrainFromField () {

    }

    async moveGrainToWarehouse () {

    }
}

function createService (options) {
    return new ActionsService(options);
}

module.exports.createService = createService;