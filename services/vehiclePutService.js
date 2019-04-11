'use strict';

const vehiclesDb = require('../models/vehiclesDB');
const vehiclesModel = vehiclesDb.createModel('vehicles');

async function updateData (id, data) {
    return await vehiclesModel.update(id, data);
}

module.exports.updateData = updateData;