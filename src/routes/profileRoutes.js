const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');
const authenticate = require('../middlewares/authenticate');
const logger = require('../utils/logger'); // Add logging utility

const router = express.Router();

// Log initialization
logger.info('Profile Routes initialized.');

// Middleware: Ensure all routes are authenticated
router.use((req, res, next) => {
    logger.info(`Profile route accessed by user ID: ${req.user ? req.user.id : 'unknown'}`);
    authenticate(req, res, next);
});

// Route: Get user profile
router.get('/', async (req, res) => {
    try {
        logger.info(`Get User Profile request received. User ID: ${req.user.id}`);
        await getUserProfile(req, res);
    } catch (error) {
        logger.error(`Error in Get User Profile: ${error.message}`);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route: Update user profile
router.put('/', async (req, res) => {
    try {
        logger.info(`Update User Profile request received. User ID: ${req.user.id}`);
        await updateUserProfile(req, res);
    } catch (error) {
        logger.error(`Error in Update User Profile: ${error.message}`);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
