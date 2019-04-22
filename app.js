const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const PORT = process.env.PORT || 3000;
const logStream = fs.createWriteStream(path.join(__dirname, 'requestLog.log'));

const vehiclesRoute = require('./routes/vehicles');
const fieldsRoute = require('./routes/fields');
const warehouseRoute = require('./routes/warehouse');
const garageRoute = require('./routes/garage');
const actionsRoute = require('./routes/actions');

app.use(requestLogger(logStream));
app.use(bodyParser.json());

app.use('/api/vehicles', vehiclesRoute);
app.use('/api/warehouse', warehouseRoute);
app.use('/api/garage', garageRoute);
app.use('/api/fields', fieldsRoute);
app.use('/api/actions', actionsRoute);

app.use((req, res, next) => {
    res.status(404).send('Not found');
});

app.use(errorHandler);
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(PORT, function(){
    console.log(`Server has started at port ${PORT}`);
});