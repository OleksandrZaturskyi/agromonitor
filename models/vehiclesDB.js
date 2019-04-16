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
        try {
            let result = await dbConnect.collection.insertOne(document);
            if (result.result.n === 0) {
                const err= new Error('Not created');
                err.statusCode = 404;
                throw err;  
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            dbConnect.client.close();
        }

    }

    async read (id) {
        let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        try {
            let idObject = id ? {"_id": new mongo.ObjectId(id)} : null;
            let result = idObject ? await dbConnect.collection.findOne(idObject) : await dbConnect.collection.find().toArray();
            if (!result) {
            const err = new Error('Wrong id');
            err.statusCode = 400;
            throw err;
            }
            return result;
        }
        catch (error) {
            throw error;
        }
        finally {
            dbConnect.client.close();
        }
    }

    async update (id, data) {
        let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        try {
            let result = await dbConnect.collection.updateMany({"_id": new mongo.ObjectId(id)}, {$set:data});
            if (result.result.n === 1 && result.result.nModified === 0) {
                const err = new Error('Already up to date');
                err.statusCode = 400;
                throw err;  
            } else if (result.result.n === 0) {
                const err = new Error('Not found');
                err.statusCode = 404;
                throw err;
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            dbConnect.client.close();
        }
    }

    async delete (id) {
        let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        try {
            let result = await dbConnect.collection.deleteOne({"_id": new mongo.ObjectID(id)});
            if (result.result.n === 0) {
                const err = new Error('Not deleted');
                err.statusCode = 404;
                throw err;  
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            dbConnect.client.close();
        }
    }
}

function createModel (options) {
    return new Model(options);
}

module.exports.createModel = createModel;
