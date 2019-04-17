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

    async _tryCatchFinally (codeToCheck, operation, client) {
        try {
            let result = await codeToCheck;
            switch (operation) {
                case 'create':
                case 'delete':
                    if (result.result.n === 0) {
                        let err = new Error ("Wrong id");
                        err.statusCode = 400;
                        throw err;
                    }
                    break;
                case 'read':
                    if (!result) {
                        let err = new Error ("Data not found");
                        err.statusCode = 400;
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
                    console.log('You can only pass create, read, update or delete operations as an arg')


            }
            return result;
        } catch (err) {
            throw err;
        } finally {
            client.close()
        }
    }

    async create (document) {
        let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        return this._tryCatchFinally(dbConnect.collection.insertOne(document),'create', dbConnect.client)
    }

    async read (id) {
        let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        let idObject = id ? {"_id": new mongo.ObjectId(id)} : null;
        return idObject ? this._tryCatchFinally(dbConnect.collection.findOne(idObject),'read', dbConnect.client)
            : this._tryCatchFinally(dbConnect.collection.find().toArray(),'read', dbConnect.client) ;

    }

    async update (id, data) {
        let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        return this._tryCatchFinally(dbConnect.collection.updateMany({"_id": new mongo.ObjectId(id)}, {$set:data}), 'update', dbConnect.client)
    }

    async delete (id) {
        let dbConnect = await this._connectToDB(MongoClient, db, this.collectionName);
        return this._tryCatchFinally(await dbConnect.collection.deleteOne({"_id": new mongo.ObjectID(id)}), 'delete', dbConnect.client)
    }
}

function createModel (options) {
    return new Model(options);
}

module.exports.createModel = createModel;