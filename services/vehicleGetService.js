const vehiclesDb = require('../models/vehiclesDB');
const vehiclesModel = vehiclesDb.createModel('vehicles');

async function getData(id) {
    return await vehiclesModel.read(id)
}

module.exports.getData = getData;