'use strict';

const vehiclesDb = require('../models/vehiclesDB');
const vehiclesModel = vehiclesDb.createModel('vehicles');

async function deleteData (id) {
    return await vehiclesModel.delete(id);
}

module.exports.deleteData = deleteData;