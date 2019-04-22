const garageDb = require('../models/model');
const garageModel = garageDb.createModel('garage');

class GarageService {
    constructor () {}

    async postService (data) {
        return garageModel.create({...data, "vehicles": []});
    }

    async getService (id) {
        return garageModel.read(id);
    }

    async deleteService (id) {
        return garageModel.delete(id);
    }

    async putService (id, data) {
        return garageModel.update(id, data);
    }
    
}

function createService (options) {
    return new GarageService(options);
}

module.exports.createService = createService;