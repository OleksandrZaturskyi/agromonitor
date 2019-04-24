const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const uri = "mongodb://localhost:27017/";
const db = 'agromonitor';

class Model {
    constructor(name) {
        this.collectionName = name;
    }

    async _connectToDB(mongoClient, dbName, collectionName) {
        const client = await mongoClient.connect(uri, {useNewUrlParser: true});
        return {client: client, collection: client.db(dbName).collection(collectionName)};
    }

    async _tryCatchFinally(opPromise, operation, client) {
        try {
            const result = await opPromise;
            switch (operation) {
                case 'create':
                    break;
                case 'delete':
                    if (result.result.n === 0) {
                        const err = new Error("Wrong id");
                        err.statusCode = 400;
                        throw err;
                    }
                    break;
                case 'read':
                    if (!result) {
                        const err = new Error("Data not found");
                        err.statusCode = 404;
                        throw err;
                    }
                    break;
                case 'update':
                    if (result.result.n === 1 && result.result.nModified === 0) {
                        const err = new Error('Already up to date');
                        err.statusCode = 400;
                        throw err;
                    } else if (result.result.n === 0) {
                        const err = new Error('Wrong id');
                        err.statusCode = 400;
                        throw err;
                    }
                    break;
                default:
                    const err = new Error('You can only pass create, read, update or delete operations');
                    err.statusCode = 400;
                    throw err;
            }
            return result;
        } catch (err) {
            throw err;
        } finally {
            client.close()
        }
    }

    async create(document) {
        const dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        const opPromise = dbConnect.collection.insertOne(document);
        return this._tryCatchFinally(opPromise, 'create', dbConnect.client);
    }

    async read(id) {
        const dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        const idObject = id ? {"_id": new mongo.ObjectId(id)} : null;
        const opPromise = idObject ? dbConnect.collection.findOne(idObject)
            : dbConnect.collection.find().toArray();
        return this._tryCatchFinally(opPromise, 'read', dbConnect.client);

    }

    async readByIDsArray(idsArray) {
        const dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        const arrayOfIdsObjects = idsArray.map(el => new mongo.ObjectId(el));
        const opPromise = dbConnect.collection.find({_id: {$in: arrayOfIdsObjects}}).toArray();
        return this._tryCatchFinally(opPromise, 'read', dbConnect.client);
    }

    async update(id, data) {
        const dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        const _id = new mongo.ObjectId(id);
        const opPromise = dbConnect.collection.updateMany({"_id": _id}, {$set: data});
        return this._tryCatchFinally(opPromise, 'update', dbConnect.client);
    }

    async delete(id) {
        const dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        const _id = new mongo.ObjectID(id);
        const opPromise = dbConnect.collection.deleteOne({"_id": _id});
        return this._tryCatchFinally(opPromise, 'delete', dbConnect.client);
    }
}

module.exports.createModel = (options) => {
    return new Model(options);
};
