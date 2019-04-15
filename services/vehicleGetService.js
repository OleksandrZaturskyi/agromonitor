const vehiclesDb = require('../models/vehiclesDB');
const vehiclesModel = vehiclesDb.createModel('vehicles');

async function getData(parameters) {
    let filter = Object.keys(parameters).length ?  {_id: +parameters.id} : null;
    return await vehiclesModel.read(filter)
}

module.exports.getData = getData;