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

        let lastDoc = await collection.find().sort({"_id" : -1}).limit(1).toArray();
        document._id = lastDoc.length ? lastDoc[0]._id + 1 : 0;

        return collection.insertOne(document)
            .then(result => {
                client.close();
                return result.ops[0]})
            .catch(err => console.error(err));
    }

    async read (filter) {
        let client = await MongoClient.connect(uri, { useNewUrlParser: true })
            .then(client => client).catch(err => console.error(err));
        let collection = await client.db('agromonitor').collection(this.collectionName);

        return collection.find(filter).toArray()
                .then(result => {
                  client.close();
                  return  result.length ? result : 'data not found';
                }).catch(err => console.error(err));
    }

    async update (document, updatedDocument) {
        let client = await MongoClient.connect(uri, { useNewUrlParser: true })
            .then(client => client).catch(err => console.error(err));
        let collection = await client.db('agromonitor').collection(this.collectionName);

        return collection.updateOne(document, updatedDocument)
            .then(result => result.ops[0])
            .catch(err => console.error(err));
    }

    async delete (document) {
        let client = await MongoClient.connect(uri, { useNewUrlParser: true })
            .then(client => client).catch(err => console.error(err));
        let collection = await client.db('agromonitor').collection(this.collectionName)
            .then(result => result.result)
            .catch(err => console.error(err));
    }
}

function createModel (options) {
    return new Model(options);
}

module.exports.createModel = createModel;
