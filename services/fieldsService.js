const fieldsDb = require('../models/fieldsDB');
const fieldsModel = fieldsDb.createModel('fields');
const garageModel = fieldsDb.createModel('garage');

class VehiclesService {
    constructor () {}

    async postService (data) {
        return fieldsModel.create(data);
    }

    async getService (id) {
        return fieldsModel.read(id);
    }

    async putService (id, query) {
        let garage = await garageModel.read("5cb74cee7d2d4b03e0f26065");
        let vehiclesObj = garage.vehicles;
        let car = vehiclesObj[query._id];
        delete vehiclesObj[query._id];
        await garageModel.update("5cb74cee7d2d4b03e0f26065", {"vehicles": vehiclesObj});
        let toUpdate = {
            "vehicles": {
                [query._id]: car
            }
        };
        return fieldsModel.update(id, toUpdate);
    }

    async deleteService (id) {
        return fieldsModel.delete(id);
    }
}

function createService (options) {
    return new VehiclesService(options);
}

module.exports.createService = createService;