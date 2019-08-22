// Way One
const logger = require('./logger'); // const is better
// execute the log method
logger.log();

// Way Two - better, more lightweight
const { log, url } = require('./logger');

// If it is a single function
// module.exports = log;
const log = require('./logger');
log('hello');
