function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  if (!err.statusCode) err.statusCode = 500; 
  res.status(err.statusCode).json(err.message);
}
module.exports = errorHandler;