const garageDb = require('../models/model');
const garageModel = garageDb.createModel('garage');
const fieldsModel = garageDb.createModel('fields');

class GarageService {
    constructor () {}

    async postService (data) {
        return garageModel.create({...data, "vehicles": []});
    }

    async getService (id, action) {
        if (id && action === 'getAllVehiclesFromOneGarage') {
            let vehiclesInGarage = (await fieldsModel.read(id)).vehicles;
            return garageModel.readByIDsArray(vehiclesInGarage);
        } else if (!id && action === 'getAllVehicles') {
            let vehiclesInGarages = (await fieldsModel.read()).reduce((acc, el) => acc.concat(el.vehicles), []);
            return garageModel.readByIDsArray(vehiclesInGarages);
        } else if (action !== 'getAllVehiclesFromOneField' && action !== 'getAllVehicles') {
            return garageModel.read(id);
        }
        let err = new Error('Bad request');
        err.statusCode = 400;
        throw err;
    }

    async putService (id, data) {
        return garageModel.update(id, data);
    }
    
    async deleteService (id) {
        return garageModel.delete(id);
    }
}

function createService (options) {
    return new GarageService(options);
}

module.exports.createService = createService;