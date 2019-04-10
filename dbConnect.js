'use strict';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";

const client = MongoClient.connect(uri, { useNewUrlParser: true })
    .then( result => {
        console.log('Successfully connected to the database');
        return result;
    }).catch(err => console.error(`Connection to database was rejected \n${err.stack}`));

const dbClient = client.then(dataBase => {
    return dataBase.db('agromonitor');
    }).catch(err => console.error(err));

module.exports.dbClient = dbClient;