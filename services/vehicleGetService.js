'use strict';

const vehiclesDb = require('../models/vehiclesDB');
const vehiclesModel = vehiclesDb.createModel('vehicles');

async function getData(parameters) {
    return await vehiclesModel.read(parameters.id)
}

module.exports.getData = getData;