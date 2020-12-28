const _ = require('lodash');
const RequestHandler = require('../util/RequestHandler');
const Logger = require('../util/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class BaseController {
    constructor(options) {
        this.limit = 20;
        this.options = options;
    }
}

module.exports = BaseController;