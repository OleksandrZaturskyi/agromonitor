'use strict';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";

const client = MongoClient.connect(uri, { useNewUrlParser: true })
    .then( db => db.db('agromonitor'))
    .catch(err => console.error(err));

module.exports.client = client;