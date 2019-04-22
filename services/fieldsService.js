const model = require('../models/model');
const vehiclesModel = model.createModel('vehicles');
const fieldsModel = model.createModel('fields');
const garageModel = model.createModel('garage');

class VehiclesService {
    constructor () {}

    async postService (data) {
        return fieldsModel.create({...data, "vehicles": []});
    }

    async getService (id, action) {
        if (id && action === 'getAllVehiclesFromOneField') {
            let vehiclesAtField = (await fieldsModel.read(id)).vehicles;
            return vehiclesModel.readByIDsArray(vehiclesAtField);
        } else if (!id && action === 'getAllVehicles') {
            let vehiclesAtFields = (await fieldsModel.read()).reduce((acc, el) => acc.concat(el.vehicles), []);
            return vehiclesModel.readByIDsArray(vehiclesAtFields);
        } else if (action !== 'getAllVehiclesFromOneField' && action !== 'getAllVehicles') {
            return fieldsModel.read(id);
        }
        let err = new Error('Bad request');
        err.statusCode = 400;
        throw err;

    }

    async putService (id, query) {
        return fieldsModel.update(id, query);
    }

    async deleteService (id) {
        return fieldsModel.delete(id);
    }
}

function createService (options) {
    return new VehiclesService(options);
}

module.exports.createService = createService;