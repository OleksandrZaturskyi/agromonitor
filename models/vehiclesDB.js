'use strict';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { useNewUrlParser: true });
const dbName ='agromonitor';
const collectionName = 'vehicles';




class Model {
    constructor () {}

    // create (document) {
    //     client.connect((err, client) => {
    //         if (err) return console.log(err);
    //
    //         const collection = client.db(`${dbName}`).collection(`${collectionName}`);
    //         collection.insertOne(document, (err, results) => {
    //
    //             if (err) return console.log(err);
    //
    //             console.log(results.ops);
    //
    //             client.close();
    //         });
    //     });
    // }

    async create (document) {
        // let connection = await client.connect();
        let collection = await client.db(`${dbName}`).collection(`${collectionName}`);
        return collection.insertOne(document).then(result => result.ops[0]);
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