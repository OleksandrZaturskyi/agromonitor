const model = require('../models/model');
const vehiclesModel = model.createModel('vehicles');
const garageModel = model.createModel('garage');

class VehiclesService {
    constructor () {}

    async postService (data, garageId) {
        const result = await vehiclesModel.create(data);
        const vehiclesInGarage = (await  garageModel.read(garageId)).vehicles;
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

module.exports.createService = () => new VehiclesService();