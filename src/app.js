const express = require('express');
const logger = require('./utils/logger'); // Ensure the logger path is correct
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
require('dotenv').config()
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});
const testRoutes = require('./routes/testRoutes');
// Routes
logger.info('Initializing routes...');
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/test', testRoutes);

// Root Route
app.get('/', (req, res) => {
    logger.info('Root route accessed.');
    res.send('Labour Application Backend is Running.');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    logger.error(`Unhandled error: ${err.message}`);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Server Initialization
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
