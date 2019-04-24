const garageDb = require('../models/model');
const vehiclesModel = garageDb.createModel('vehicles');
const garageModel = garageDb.createModel('garage');

class GarageService {
    constructor () {}

    async postService (data) {
        return garageModel.create({...data, "vehicles": []});
    }

    async getService (id, action) {
        if (id && action === 'getAllVehiclesFromOneGarage') {
            const vehiclesInGarage = (await garageModel.read(id)).vehicles;
            return vehiclesModel.readByIDsArray(vehiclesInGarage);
        } else if (!id && action === 'getAllVehicles') {
            const vehiclesInGarages = (await garageModel.read()).reduce((acc, el) => acc.concat(el.vehicles), []);
            return vehiclesModel.readByIDsArray(vehiclesInGarages);
        } else if (action !== 'getAllVehiclesFromOneField' && action !== 'getAllVehicles') {
            return garageModel.read(id);
        }
        let err = new Error('Bad request');
        err.statusCode = 400;
        throw err;
    }

    async putService (id, data) {
        if (data.action === "deleteVehicle") {
            const garageVehicles = (await garageModel.read(id)).vehicles;
            const updatedVehicles = garageVehicles.filter(el => el.toString() !== data._id);
            await vehiclesModel.delete(data._id);
            return garageModel.update(id, {"vehicles": updatedVehicles});
        } else {
            let err = new Error('Not allowed action');
            err.statusCode = 400;
            throw err;
        }
    }
    
    async deleteService (id) {
        return garageModel.delete(id);
    }
}

module.exports.createService = () => new GarageService();