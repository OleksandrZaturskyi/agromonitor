const warehouseDb = require('../models/model');
const warehouseModel = warehouseDb.createModel('warehouse');

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

module.exports.createService = () => new WarehouseService();