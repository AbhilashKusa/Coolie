const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger.warn('Access denied: No token provided');
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        logger.info(`Authentication successful for User ID: ${decoded.id}`);
        next();
    } catch (err) {
        logger.error(`Authentication failed: ${err.message}`);
        res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }
};

module.exports = authenticate;
