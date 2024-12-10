const sql = require('mssql');
const logger = require('../utils/logger');

// Database configuration
const dbConfig = {
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: false, // Use true if encryption is required
        trustServerCertificate: true, // Use for self-signed certificates
    },
    port: parseInt(process.env.DB_PORT, 10) || 1433,
};

const poolPromise = sql
    .connect(dbConfig)
    .then(pool => {
        logger.info('Connected to SQL Server successfully');
        return pool;
    })
    .catch(err => {
        logger.error(`Database connection failed: ${err.message}`);
        throw new Error(err.message);
    });

module.exports = { sql, poolPromise };
