const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),           // Log to console
    new winston.transports.File({ filename: 'error.log', level: 'error' }) // Log errors to a file
  ]
});

logger.info('Server started...');
logger.error('Something went wrong!');