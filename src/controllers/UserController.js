const Joi = require('joi');
const _ = require('lodash');
const Logger = require('../util/logger');
const RequestHandler = require('../util/RequestHandler');
const BaseController = require('./BaseController');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class UserController extends BaseController {

    static async sampleMethod(req, res) {
        try {
            requestHandler.sendSuccess(res, 'Success Message')();
        }catch(error) {
            return requestHandler.sendError(req, res, error);
        }
    }

}

module.exports = UserController;