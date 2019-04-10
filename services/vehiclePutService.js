'use strict';

const vehiclesDb = require('../models/vehiclesDB');
const vehiclesModel = vehiclesDb.createModel();

async function updateData (data, newData) {
    return await vehiclesModel.update(data, newData);
}

module.exports.updateData = updateData;