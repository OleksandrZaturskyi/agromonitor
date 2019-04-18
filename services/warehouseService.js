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

    async putService (id, query) {
        let fields = await fieldsModel.read("5cb74cee7d2d4b03e0f26065");
        let vehiclesObj = fields.vehicles;
        let grainOnField = fields.countOfGrain;
        let car = vehiclesObj[query._id];
        let grain = car.countOfGetGrain;
        await fieldsModel.update("5cb74cee7d2d4b03e0f26065", {"countOfGrain": grainOnField - grain});
        await vehiclesModel.update("5cb74cee7d2d4b03e0f26065", {"countOfGetGrain": 0});
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