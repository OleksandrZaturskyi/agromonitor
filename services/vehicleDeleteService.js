'use strict';

const vehiclesDb = require('../models/vehiclesDB');
const vehiclesModel = vehiclesDb.createModel('vehicles');

async function deleteData (parameters) {
    return await vehiclesModel.delete(parameters.id);
}

module.exports.deleteData = deleteData;