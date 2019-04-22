const model = require('../models/model');
const actionsModel = model.createModel('actions');


class ActionsService {
    constructor () {}

    async postService (data) {
        return actionsModel.create(data);
    }
}

function createService (options) {
    return new ActionsService(options);
}

module.exports.createService = createService;