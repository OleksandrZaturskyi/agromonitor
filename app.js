'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const logStream = fs.createWriteStream(path.join(__dirname, 'requestLog.log'));

//Routes
const vehiclesRoute = require('./routes/vehicles');

//Logger
app.use(morgan('combined', {stream: logStream}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api', vehiclesRoute);

// Error 404 handler

app.use((req, res, next) => {
    res.status(404).send('Not found');
});

app.listen(PORT, function(){
    console.log(`Server has started at port ${PORT}`);
});