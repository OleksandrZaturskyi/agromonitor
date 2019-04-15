const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const requestLogger = require('./middlewares/request-logger');

const app = express();
const PORT = process.env.PORT || 3000;
const logStream = fs.createWriteStream(path.join(__dirname, 'requestLog.log'));
const errorHandler = require('./middlewares/errorHandler');
const vehiclesRoute = require('./routes/vehicles');
app.use(requestLogger(logStream));

app.use(bodyParser.json());

app.use('/api/vehicles', vehiclesRoute);

// Error 404 handler

app.use((req, res, next) => {
    res.status(404).send('Not found');
});

//Error handler
app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server has started at port ${PORT}`);
});