const express = require('express');
const { poolPromise } = require('../config/db');
const logger = require('../utils/logger');

const router = express.Router();

// Test database connection
router.get('/test-db', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT TOP 1 * FROM Users'); // Replace with an existing table
        logger.info('Database test query executed successfully');
        res.status(200).json({
            success: true,
            message: 'Database connection successful',
            data: result.recordset,
        });
    } catch (error) {
        logger.error('Database test query failed:', error.message);
        res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: error.message,
        });
    }
});

module.exports = router;
