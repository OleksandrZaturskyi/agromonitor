const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const uri = "mongodb://localhost:27017";

class Model {
    constructor (name) {
        this.collectionName = name;
    }

    async create (document) {
        let client = await MongoClient.connect(uri, { useNewUrlParser: true })
                .then(client => client).catch(err => err => {
                    err.status = 500;
                    throw err;
                });
        let collection = await client.db('agromonitor').collection(this.collectionName);

        let lastDoc = await collection.find().sort({"_id" : -1}).limit(1).toArray();
        document._id = lastDoc.length ? lastDoc[0]._id + 1 : 0;

        return collection.insertOne(document)
            .then(result => {
                client.close();
                return result.ops[0]})
            .catch(err => {
                err.status = 500;
                throw err;
            });
    }

    async read (filter) {
        let client = await MongoClient.connect(uri, { useNewUrlParser: true })
            .then(client => client).catch(err => {
                err.status = 500;
                throw err;
            });
        let collection = await client.db('agromonitor').collection(this.collectionName);

        return collection.find(filter).toArray()
                .then(result => {
                  client.close();
                  if (result.length) {
                      return result;
                  } else {
                      const error = new Error('data not found');
                      error.statusCode = 404;
                      throw error;
                  }
                }).catch(error => {
                    error.statusCode = 500;
                    throw error;
                });
    }

    async update (id, data) {
        let client = await MongoClient.connect(uri, { useNewUrlParser: true })
            .then(client => client).catch(err => {
                err.status = 500;
                throw err;
            });
        let collection = await client.db('agromonitor').collection(this.collectionName);

        return collection.updateOne({"_id": new mongo.ObjectId(id)}, {$set: data})
            .then(result => result.ops[0])
            .catch(err => {
                err.status = 500; /////////??????????
                throw err;
            });
    }

    async delete (id) {
        let client = await MongoClient.connect(uri, { useNewUrlParser: true })
            .then(client => client).catch(err => {
                err.status = 500;
                throw err;
            });
        let collection = await client.db('agromonitor').collection(this.collectionName);
        
        return collection.deleteOne({"_id": new mongo.ObjectId(id)})
            .then(result => result.result)
            .catch(err => {
                err.status = 400;
                throw err;
            });  
    }
}

function createModel (options) {
    return new Model(options);
}

module.exports.createModel = createModel;
