const logger = require('../utils/logger');

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            logger.warn(`Access denied: User ID: ${req.user.id}, Role: ${req.user.role}`);
            return res.status(403).json({ success: false, message: 'Access denied.' });
        }
        logger.info(`Role verified: User ID: ${req.user.id}, Role: ${req.user.role}`);
        next();
    };
};

module.exports = roleMiddleware;
