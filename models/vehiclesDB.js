'use strict';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";


class Model {
    constructor (name) {
        this.collectionName = name;
    }

    async create (document) {
        let client = await MongoClient.connect(uri, { useNewUrlParser: true })
                .then(client => client).catch(err => console.error(err));
        let collection = await client.db('agromonitor').collection(this.collectionName);

        return collection.insertOne(document)
            .then(result => {
                client.close();
                return result.ops[0]})
            .catch(err => console.error(err));
    }

    async read (id) {
        let client = await MongoClient.connect(uri, { useNewUrlParser: true })
            .then(client => client).catch(err => console.error(err));
        let collection = await client.db('agromonitor').collection(this.collectionName);

        return collection.find().toArray()
                .then(result => result)
                .catch(err => console.error(err));
    }
}

function createModel (options) {
    return new Model(options);
}

module.exports.createModel = createModel;
