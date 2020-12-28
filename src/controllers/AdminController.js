const Joi = require('joi');
const _ = require('lodash');
const Logger = require('../util/logger');
const RequestHandler = require('../util/RequestHandler');
const BaseController = require('./BaseController');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class AdminController extends BaseController {

}

module.exports = AdminController;