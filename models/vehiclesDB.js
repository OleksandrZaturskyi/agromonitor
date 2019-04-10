'use strict';

const dbClient = require('../dbConnect').dbClient;
const collectionName = 'vehicles';

class Model {
    constructor () {}

    async create (document) {
        let db = await dbClient;
        let collection = await db.collection(`${collectionName}`);

        return collection.insertOne(document)
            .then(result => result.ops[0])
            .catch(err => console.error(err));
    }
    // read () {
    //     client.connect(err => {
    //         if(err) console.error(err);
    //         const coll = client.db(`${dbName}`).collection(`${collectionName}`);
    //         coll.findOne(function(err, doc){
    //             console.log(doc);
    //             client.close();
    //         });
    //     });
    // }
}

function createModel (options) {
    return new Model(options);
}

module.exports.createModel = createModel;
