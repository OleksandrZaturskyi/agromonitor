const ValidationError = require('../modules/errorsConctructors').ValidationError;

function allowedFieldsValidator (allowedFields) {
    return function validateAllowedFields (req, res, next) {
        const bodyArr = [];
        for (let key in req.body) {
            bodyArr.push(key);
        }
        const notAllowed = bodyArr.filter(el => allowedFields.indexOf(el) === -1);
        if (notAllowed.length > 0) {
            let resJSON = {
                "Not allowed": notAllowed,
                "Allowed fields": allowedFields
            };
            throw new ValidationError('NOT ALLOWED FIELDS', 'Request body contain not allowed fields', 400, resJSON);
        }
        next();
    }
}

module.exports.allowedFieldsValidator = allowedFieldsValidator;