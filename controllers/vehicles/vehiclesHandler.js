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
     handlePost (req, res) {
        if(!req.body) return res.sendStatus(400);

        let postResult = async (reqBody) => {
            const result = await vehiclesModel.create(reqBody);
            return result;
        }
        postResult(req.body).then(result => res.send(result)).catch(err => console.error(err))
    }
}

function createHandler (options) {
    return new VehiclesHandler(options);
}

module.exports.createHandler = createHandler;