const app = require('./app');
const config = require('./config/appconfig');
const Logger = require('./util/logger');
const { port } = config.app;

const logger = new Logger();

process.on('SIGINT', () => {
    logger.log('stopping the server', 'info');
    process.exit();
});

app.listen(port, () => console.log(`Listening at port ${port}`));

module.exports = app;