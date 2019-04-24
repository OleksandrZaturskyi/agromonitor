const model = require('../models/model');
const vehiclesModel = model.createModel('vehicles');
const fieldsModel = model.createModel('fields');

class FieldsService {
    constructor () {}

    async postService (data) {
        return fieldsModel.create({...data, "vehicles": []});
    }

    async getService (id, action) {
        if (id && action === 'getAllVehiclesFromOneField') {
            const vehiclesAtField = (await fieldsModel.read(id)).vehicles;
            return vehiclesModel.readByIDsArray(vehiclesAtField);
        } else if (!id && action === 'getAllVehicles') {
            const vehiclesAtFields = (await fieldsModel.read()).reduce((acc, el) => acc.concat(el.vehicles), []);
            return vehiclesModel.readByIDsArray(vehiclesAtFields);
        } else if (!action) {
            return fieldsModel.read(id);
        }
        let err = new Error('Bad request');
        err.statusCode = 400;
        throw err;
    }

    async putService (id, data) {
        if (data.action === "deleteVehicle") {
            const vehiclesAtField = (await fieldsModel.read(id)).vehicles;
            const updatedVehicles = vehiclesAtField.filter(el => el.toString() !== data._id);
            await vehiclesModel.delete(data._id);
            return fieldsModel.update(id, {"vehicles": updatedVehicles});
        } else {
            const err = new Error('Not allowed action');
            err.statusCode = 400;
            throw err;
        }
    }

    async deleteService (id) {
        return fieldsModel.delete(id);
    }
}

module.exports.createService = () => new FieldsService();