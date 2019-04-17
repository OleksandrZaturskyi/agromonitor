const fieldsService = require('../../services/fieldsService');
const services = fieldsService.createService();

class FieldsController {
    constructor () {}

    handlePost (req, res, next) {
        services.postService(req.body)
            .then(() => {
                res.status(201).send('Field successfully created')
            })
            .catch(err => next(err));
    }

    handleGet (req, res, next) {
        services.getService(req.params.id)
            .then(result => {
                res.json(result);
            })
            .catch(err => next(err));
    }

    handleDelete (req, res, next) {
        services.deleteService(req.params.id)
            .then(() => {
                res.send('Field successfully deleted');
            })
            .catch(err => next(err));
    }

    handlePut (req, res, next) {
        services.putService(req.params.id, req.query, req.body)
            .then(() => {
                res.send('Field successfully updated');
            })
            .catch(err => next(err));
    }
}

function createController (options) {
    return new FieldsController(options);
}

module.exports.createController = createController;