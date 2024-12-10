const logger = require('../utils/logger');

// Log all requests
const requestLogger = (req, res, next) => {
    logger.info(`Incoming Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
    next();
};

// Log errors
const errorLogger = (err, req, res, next) => {
    logger.error(`Error: ${err.message} - Stack: ${err.stack}`);
    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = { requestLogger, errorLogger };
