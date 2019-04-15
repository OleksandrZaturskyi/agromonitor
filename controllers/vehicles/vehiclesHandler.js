const vehiclePostService = require('../../services/vehiclePostService');
const vehicleGetService = require('../../services/vehicleGetService');
const vehiclePutService = require('../../services/vehiclePutService');
const vehicleDeleteService = require('../../services/vehicleDeleteService');

class VehiclesHandler {
    constructor () {}

     handlePost (req, res, next) {
        if(!this.__isValidDocument(req.body)) {
            const error = new Error('Missing required fields');
            error.statusCode = 400;
            throw error;
        }

        let postResult = async (reqBody) => {
            return await vehiclePostService.createData(reqBody);
        };
        postResult(req.body)
            .then(result => res.json(result))
            .catch(err => next(err))
    }

    __isValidDocument (reqBody) {
        if(!reqBody) return false;

        const requiredFields = ['name', 'capacity', 'countOfGetGrain'];

        let checkFields = requiredFields.filter(el => !reqBody.hasOwnProperty(el));
        if (checkFields.length > 0) return false;
        return true;
    }

    handleGet (req, res, next) {
        let getResult = vehicleGetService.getData(req.params);
        getResult.then(result => res.json(result))
            .catch(err => {
                next(err);
            })
    }

    handleDelete (req, res, next) {
        vehicleDeleteService.deleteData(req.params.id)
            .then(result => res.json(result))
            .catch(err => next(err))
    }

    handlePut (req, res, next) {
        console.log(req);
        vehiclePutService.updateData(req.params.id, req.body)
            .then(result => res.json(result))
            .catch(err => next(err))
    }

}

function createHandler (options) {
    return new VehiclesHandler(options);
}

module.exports.createHandler = createHandler;