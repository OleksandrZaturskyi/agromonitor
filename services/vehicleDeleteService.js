'use strict';

const vehiclesDb = require('../models/vehiclesDB');
const vehiclesModel = vehiclesDb.createModel('vehicles');

async function deleteData (data) {
    return await vehiclesModel.delete(data);
}

module.exports.deleteData = deleteData;