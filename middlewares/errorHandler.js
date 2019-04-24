function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  if (!err.statusCode) err.statusCode = 500;
  const errReport = {
    "message": err.message,
    ...err.errorInfo
  };
  res.status(err.statusCode).json(errReport);
}

module.exports = errorHandler;