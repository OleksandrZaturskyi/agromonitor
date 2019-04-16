const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const uri = "mongodb://localhost:27017/";
const db = 'agromonitor';

class Model {
    constructor (name) {
        this.collectionName = name;
    }
    
    async _connectToDB (mongoClient, dbName, collectionName) {
            let client =  await mongoClient.connect(uri, { useNewUrlParser: true });
            let collection = client.db(dbName).collection(collectionName);
            return {client: client, collection: collection};
    }

    async create (document) {
            let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
            try {
                let result = await dbConnect.collection.insertOne(document);
                return result.result.n;
            } catch (err) {
                throw err;
            } finally {
                dbConnect.client.close();
            }

    }

    async read (id, filter) {
        let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        try {
            let result =  id ? await dbConnect.collection.findOne({"_id": new mongo.ObjectId(id)})
                : await dbConnect.collection.find(filter || {}).toArray();
            if (!result) {
                let err = new Error('Not found');
                err.statusCode = 404;
                throw err;
            }
            return result;
        } catch (err) {
            throw err;
        } finally {
            dbConnect.client.close();
        }

    }

    async update (id, data) {
            let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
            let result = await dbConnect.collection.updateMany({"_id": new mongo.ObjectId(id)}, {$set:data});
            dbConnect.client.close();
            return result.result.nModified;
    }

    async delete (id) {
            let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
            let result = await dbConnect.collection.deleteOne({"_id": new mongo.ObjectID(id)});
            dbConnect.client.close();
            return result.result.n
    }
}

function createModel (options) {
    return new Model(options);
}

module.exports.createModel = createModel;
