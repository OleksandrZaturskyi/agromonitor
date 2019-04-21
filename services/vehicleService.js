const vehiclesDb = require('../models/model');
const vehiclesModel = vehiclesDb.createModel('vehicles');
const garageModel = vehiclesDb.createModel('garage');

class VehiclesService {
    constructor () {}

    async postService (data) {
        return vehiclesModel.create(data);
        //console.log(vehicle);
        let garage = await garageModel.read("5cb74cee7d2d4b03e0f26065");
        // let vehiclesObj = garage.vehicles;
        // let car = vehiclesObj[query._id];
        // delete vehiclesObj[query._id];
        await garageModel.update("5cb74cee7d2d4b03e0f26065", {"vehicles": vehicle});
        let toUpdate = {
            "vehicles": {
                [query._id]: vehicle
            }
        };
        return garageModel.update(id, toUpdate);
        //return vehiclesModel.create(data);
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