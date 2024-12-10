const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const logger = require('../utils/logger');

const router = express.Router();

logger.info('Auth routes initialized.');

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

module.exports = router;
