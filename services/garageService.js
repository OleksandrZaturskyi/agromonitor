const garageDb = require('../models/model');
const garageModel = garageDb.createModel('garage');
const fieldsModel = garageDb.createModel('fields');

class GarageService {
    constructor () {}

    async postService (data) {
        return garageModel.create(data);
    }

    async getService (id) {
        return garageModel.read(id);
    }


    async putService (id, query) {
        let fields = await fieldsModel.read("5cb74cee7d2d4b03e0f26065");
        let vehiclesObj = fields.vehicles;
        let car = vehiclesObj[query._id];
        delete vehiclesObj[query._id];
        await fieldsModel.update("5cb74cee7d2d4b03e0f26065", {"vehicles": vehiclesObj});
        let toUpdate = {
            "vehicles": {
                [query._id]: car
            }
        };
        return garageModel.update(id, toUpdate);
    }

    
}

function createService (options) {
    return new GarageService(options);
}

module.exports.createService = createService;