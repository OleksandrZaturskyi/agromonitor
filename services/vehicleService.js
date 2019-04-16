const vehiclesDb = require('../models/vehiclesDB');
const vehiclesModel = vehiclesDb.createModel('vehicles');

class VehiclesService {
    constructor () {}

    async postService (data) {
        return vehiclesModel.create(data);
    }

    validatePostReqBody (reqBody) {
        const requiredFields = ['name', 'capacity', 'countOfGetGrain'];
        let result = requiredFields.reduce((acc, el) => reqBody.hasOwnProperty(el) ? acc : acc.concat(el), []);
        if (result.length > 0) {
            let resJSON = {
                "Error" : "Missing required fields",
                "Missing": result,
                "Required fields": requiredFields
            };
            let err = Error(JSON.stringify(resJSON));
            err.statusCode = 400;
            throw err;
        }
        const requiredTypes = {
            name: 'string',
            capacity: 'number',
            countOfGetGrain: 'number'
        };
        let typeCheckResult = [];
        for (let key in reqBody) {
            if (reqBody.hasOwnProperty(key) && !(typeof reqBody[key] === requiredTypes[key])) {
                let reqField = `${key} ${requiredTypes[key]}`;
                typeCheckResult = [...typeCheckResult, reqField];
            }
        }
        if (typeCheckResult.length > 0) {
            let resJSON = {
                "Error" : "Wrong fields types",
                "Correct types": typeCheckResult,
                "Required types": requiredTypes
            };
            let err = Error(JSON.stringify(resJSON));
            err.statusCode = 400;
            throw err;
        }
    }

    async getService (id, query) {
            return vehiclesModel.read(id);
    }

    async putService (id, data) {
        return vehiclesModel.update(id, data);
    }

    async deleteService (id) {
        return vehiclesModel.delete(id);
    }
}

function createService (options) {
    return new VehiclesService(options);
}

module.exports.createService = createService;