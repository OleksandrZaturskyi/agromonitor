function errorHandler(err, req, res, next) {
  console.error('ERROR', err);
    if (res.headersSent) {
      return next(err);
    }
    if (!err.statusCode) err.statusCode = 500; 
    res.status(err.statusCode).send(err.message); 
}

module.exports = errorHandler;