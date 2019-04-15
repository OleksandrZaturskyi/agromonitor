const vehiclesDb = require('../models/vehiclesDB');
const vehiclesModel = vehiclesDb.createModel('vehicles');

class VehiclesService {
    constructor () {}
    async postService (data) {
        return vehiclesModel.create(data);
    }
    async getService (params) {
        return vehiclesModel.read(params.id)
    }
    async putService (params, data) {
        return vehiclesModel.update(params.id, data);
    }
    async deleteService (params) {
        return vehiclesModel.delete(params.id);
    }
}

function createService (options) {
    return new VehiclesService(options);
}

module.exports.createService = createService;