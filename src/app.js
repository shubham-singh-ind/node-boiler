const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swagger = require('./util/swagger');
const {v4: uuidv4} = require('uuid');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const config = require('./config/appconfig');
const Logger = require('./util/logger');

const app = express();
const logger = new Logger();

app.set('config', config);

// *VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/docs', swagger.router);

app.use((req, res, next) => {
	req.identifier = uuidv4();
	const logString = `a request has been made with the following uuid [${req.identifier}] ${req.url} ${req.headers['user-agent']} ${JSON.stringify(req.body)}`;
	logger.log(logString, 'info');
	next();
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
