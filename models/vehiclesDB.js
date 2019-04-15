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
        return {client: client, collection: client.db(dbName).collection(collectionName)};
    }

    async create (document) {
        try {
            let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
            let result = await dbConnect.collection.insertOne(document);
            dbConnect.client.close();
            return result.result.n;
        }
        catch (error) {
            const error = new Error('Not created');
            error.statusCode = 400;
            throw error;
        }

    }

    async read (id, filter) {
        try {
            let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
            let result =  id ? await dbConnect.collection.findOne({"_id": new mongo.ObjectId(id)})
                : await dbConnect.collection.find(filter || {}).toArray();
            dbConnect.client.close();
            if (!result || result.length < 1) return 0;
            return result;
        }
        catch (error) {
            const error = new Error('Data not found');
            error.statusCode = 404;
            throw error;
        }
    }

    async update (id, data) {
        try {
            let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
            let result = await dbConnect.collection.updateMany({"_id": new mongo.ObjectId(id)}, {$set:data});
            dbConnect.client.close();
            return result.result.nModified;
        }
        catch (error) {
            const error = new Error('Data not found');
            error.statusCode = 404;
            throw error;
        }
    }

    async delete (id) {
        try {
            let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
            let result = await dbConnect.collection.deleteOne({"_id": new mongo.ObjectID(id)});
            dbConnect.client.close();
            return result.result.n
        }
        catch (error) {
            const error = new Error('Data not found');
            error.statusCode = 404;
            throw error;
        }
    }
}

function createModel (options) {
    return new Model(options);
}

module.exports.createModel = createModel;
