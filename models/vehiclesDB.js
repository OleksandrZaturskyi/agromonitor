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
        let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        let result = await dbConnect.collection.insertOne(document);
        dbConnect.client.close();
        return result.result.n;
    }

    async read (id, filter) {
        let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        let result =  id ? await dbConnect.collection.findOne({"_id": new mongo.ObjectId(id)})
            : await dbConnect.collection.find(filter || {}).toArray();
        dbConnect.client.close();
        if (!result || result.length < 1) return 0;
        return result;
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
