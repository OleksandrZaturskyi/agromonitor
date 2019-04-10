'use strict';

const vehiclePostService = require('../../services/vehiclePostService');






class VehiclesHandler {
    constructor () {}

    // handleGet () {
    //     vehiclesModel.read();
    // }

     handlePost (req, res) {
        if(!this.__isValidDocument(req.body)) return res.status(400).send('Missing required fields');

        let postResult = async (reqBody) => {
            return await vehiclePostService.createData(reqBody);

        };
        postResult(req.body)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    }

    __isValidDocument (reqBody) {
        if(!reqBody) return false;

        const requiredFields = ['name', 'capacity', 'countOfGetGrain'];

        let checkFields = requiredFields.filter(el => !reqBody.hasOwnProperty(el));
        if (checkFields.length > 0) return false;
        return true;
    }
}

function createHandler (options) {
    return new VehiclesHandler(options);
}

module.exports.createHandler = createHandler;