const warehouseDb = require('../models/model');
const warehouseModel = warehouseDb.createModel('warehouse');
const vehiclesModel = warehouseDb.createModel('vehicles');

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

    async putService (id, query) {
        let vehicle = await vehiclesModel.read("5cb74cee7d2d4b03e0f26065");
        let grain = vehicle.countOfGetGrain;
        let warehouse = await warehouseModel.read(" ?????");
        let grainInWarehouse = warehouse.countOfGrain;
        await vehiclesModel.update("5cb74cee7d2d4b03e0f26065", {"countOfGrain" : 0 });
        let toUpdate = {
            "countOfGrain" : grainInWarehouse + grain
        };
        return warehouseModel.update(id, toUpdate);
    }

}

function createService (options) {
    return new WarehouseService(options);
}

module.exports.createService = createService;