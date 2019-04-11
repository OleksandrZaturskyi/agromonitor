'use strict';

const vehiclesDb = require('../models/vehiclesDB');
const vehiclesModel = vehiclesDb.createModel('vehicles');

async function updateData (parameters, data) {
    return await vehiclesModel.update(parameters.id, data);
}

module.exports.updateData = updateData;