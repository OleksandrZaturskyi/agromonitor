'use strict';

const vehiclesDb = require('../models/vehiclesDB');
const vehiclesModel = vehiclesDb.createModel();

async function createData (data) {
    return await vehiclesModel.create(data);

}

module.exports.createData = createData;