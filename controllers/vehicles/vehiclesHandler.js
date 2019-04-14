'use strict';

const vehiclePostService = require('../../services/vehiclePostService');
const vehicleGetService = require('../../services/vehicleGetService');
const vehiclePutService = require('../../services/vehiclePutService');
const vehicleDeleteService = require('../../services/vehicleDeleteService');






class VehiclesHandler {
    constructor () {}



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

    handleGet (req, res) {
        let getResult = vehicleGetService.getData(req.params);
        getResult.then(result => res.json(result))
            .catch(err => console.error(err))
    }

    handleDelete (req, res) {
        vehicleDeleteService.deleteData(req.params)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    }

    handlePut (req, res) {
        vehiclePutService.updateData(req.params, req.body)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    }

}

function createHandler (options) {
    return new VehiclesHandler(options);
}

module.exports.createHandler = createHandler;