'use strict';

const vehiclesDb = require('../../models/vehiclesDB');

const vehiclesModel = vehiclesDb.createModel();


class VehiclesHandler {
    constructor () {}

    // handleGet () {
    //     vehiclesModel.read();
    // }

    // handlePost (requestBody) {
    //     vehiclesModel.create(requestBody)
    //         .then( result => {
    //             return result;
    //         })
    //         .catch(err => throw err;
    // }
    async handlePost (requestBody) {
        const result = await vehiclesModel.create(requestBody);
        return result;
    }
}

function createHandler (options) {
    return new VehiclesHandler(options);
}

module.exports.createHandler = createHandler;