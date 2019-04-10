'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Connect to DB
const dbClient = require('./dbConnect').dbClient;


const app = express();
const PORT = process.env.PORT || 3000;
const logStream = fs.createWriteStream(path.join(__dirname, 'requestLog.log'));

//Routes
const vehiclesRoute = require('./routes/vehicles');

//Logger
app.use(morgan('combined', {stream: logStream}));

app.use(bodyParser.json());

app.use('/api/vehicles', vehiclesRoute);

// Error 404 handler

app.use((req, res, next) => {
    res.status(404).send('Not found');
});

//Error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, function(){
    console.log(`Server has started at port ${PORT}`);
});