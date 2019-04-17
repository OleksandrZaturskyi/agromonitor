const vehiclesDb = require('../models/model');
const vehiclesModel = vehiclesDb.createModel('vehicles');

class VehiclesService {
    constructor () {}

    async postService (data) {
        return vehiclesModel.create(data);
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