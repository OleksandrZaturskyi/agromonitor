const warehouseDb = require('../models/model');
const warehouseModel = warehouseDb.createModel('warehouse');
const vehiclesModel = warehouseDb.createModel('vehicles');
const fieldsModel = warehouseDb.createModel('fields');

class WarehouseService {
    constructor () {}

    async postService (data) {
        return warehouseModel.create(data);
    }

    async getService (id) {
            return warehouseModel.read(id);
    }

    async putService (id, data) {
        return warehouseModel.update(id, data);
    }

    async deleteService (id) {
        return warehouseModel.delete(id);
    }
}
function createService (options) {
    return new WarehouseService(options);
}

module.exports.createService = createService;