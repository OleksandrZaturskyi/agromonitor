const model = require('../models/model');
const fieldsModel = model.createModel('fields');
const garageModel = model.createModel('garage');

class VehiclesService {
    constructor () {}

    async postService (data) {
        return fieldsModel.create(data);
    }

    async getService (id) {
        return fieldsModel.read(id);
    }

    async putService (id, query) {
        let garage = await garageModel.read("5cb844e248c68a090064cb65");
        let grainAtField = (await fieldsModel.read(id)).countOfGrain;
        let vehiclesObj = garage.vehicles;
        let car = vehiclesObj[query._id];
        car.countOfGetGrain = grainAtField > car.capacity ? car.capacity : grainAtField;
        let grainLeft = grainAtField > car.capacity ? grainAtField - car.capacity : 0;
        delete vehiclesObj[query._id];
        await garageModel.update("5cb844e248c68a090064cb65", {"vehicles": vehiclesObj});
        let toUpdate = {
            "countOfGrain": grainLeft,
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