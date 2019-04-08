'use strict';

const vehiclesDb = require('../../models/vehiclesDB');

const vehiclesModel = vehiclesDb.createModel();


class VehiclesHandler {
    constructor () {}

    handleGet () {
        vehiclesModel.read();
    }
}

function createHandler (options) {
    return new VehiclesHandler(options);
}

module.exports.createHandler = createHandler;