const ValidationError = require('../modules/errorsConctructors').ValidationError;
function validateReqBody(requiredFields, requiredFieldsQuantity, requiredTypes) {
    return function (req, res, next) {
        const reqBody = req.body;
        if (requiredFields) validateRequiredFields(reqBody, requiredFields);
        if (requiredFieldsQuantity) validateFieldsQuantity(reqBody, requiredFieldsQuantity);
        if (requiredTypes) validateFieldsType(reqBody, requiredTypes);
        next();
    }
}

function validateRequiredFields (reqBody, requiredFields) {
    let result = requiredFields.reduce((acc, el) => reqBody.hasOwnProperty(el) ? acc : acc.concat(el), []);
    if (result.length > 0) {
        let resJSON = {
            "Missing": result,
            "Required fields": requiredFields
        };
        throw new ValidationError('MISSING DATA', 'Missing required fields', 400, resJSON);
    }
}

function validateFieldsQuantity (reqBody, length) {
    for (let key in reqBody) {
        length--;
    }
    if (length < 0) {
        throw new ValidationError('WRONG REQUEST', 'Request body contains more fields than necessary', 400)
    }
}

function validateFieldsType (reqBody, requiredTypes) {
    let typeCheckResult = [];
    for (let key in reqBody) {
        if (reqBody.hasOwnProperty(key) && !(typeof reqBody[key] === requiredTypes[key])) {
            let reqField = `${key} ${requiredTypes[key]}`;
            typeCheckResult = [...typeCheckResult, reqField];
        }
    }
    if (typeCheckResult.length > 0) {
        let resJSON = {
            "Correct types": typeCheckResult,
            "Required types": requiredTypes
        };
        throw new ValidationError('WRONG REQUEST', 'Wrong types of some fields', 400, JSON.stringify(resJSON));
    }
}

module.exports.validateReqBody = validateReqBody;