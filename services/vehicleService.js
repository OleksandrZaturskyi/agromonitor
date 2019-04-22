const model = require('../models/model');
const vehiclesModel = model.createModel('vehicles');
const garageModel = model.createModel('garage');

class VehiclesService {
    constructor () {}

    async postService (data, garageId) {
        let result = await vehiclesModel.create(data);
        let vehiclesInGarage = (await  garageModel.read(garageId)).vehicles;
        await garageModel.update(garageId, {vehicles: [...vehiclesInGarage, result.ops[0]._id]});
        return result;
    }

    async getService (id) {
            return vehiclesModel.read(id);
    }

    async putService (id, data) {
        return vehiclesModel.update(id, data);
    }

    async deleteService (id) {
        return vehiclesModel.delete(id);
    }
}

function createService (options) {
    return new VehiclesService(options);
}

module.exports.createService = createService;