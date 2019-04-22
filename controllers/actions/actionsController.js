const actionsService = require('../../services/actionsService');
const services = actionsService.createService();

class ActionsController {
    constructor () {}

    handlePost (req, res, next) {
        services.postService(req.body)
        .then(result => {
            res.status(201).json({"Message": "Successfully performed", "Item": result.ops[0]});
            })
            .catch(err => next(err)); 
    }
}

function createController (options) {
    return new ActionsController(options);
}

module.exports.createController = createController;