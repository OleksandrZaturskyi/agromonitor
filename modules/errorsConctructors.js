class ValidationError extends Error{
    constructor (name, message, statusCode, errorInfo, ...params) {
        super(...params);
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
        this.errorInfo = errorInfo;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationError);
        }
    }
}

module.exports = {
    ValidationError: ValidationError
};