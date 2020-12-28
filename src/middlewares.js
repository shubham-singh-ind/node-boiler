const Logger = require('./util/logger');
const RequestHandler = require('./util/RequestHandler');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

const notFound = (req, res, next) => {
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

const errorHandler = (err, req, res, next) => {
  const error = {
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '$$' : err.stack,
    status: err.status
  };
  requestHandler.sendError(req, res, error);
}

module.exports = {
  notFound,
  errorHandler
};
