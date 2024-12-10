const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

let users = []; // Temporary in-memory storage

// Register a user
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    logger.info(`Register attempt: Email: ${email}, Role: ${role}`);
    if (!name || !email || !password || !role) {
        logger.warn('Register failed: Missing fields');
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        logger.warn(`Register failed: User already exists - Email: ${email}`);
        return res.status(400).json({ error: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, name, email, password: hashedPassword, role };
    users.push(user);

    logger.info(`User registered successfully: Email: ${email}`);
    const { password: _, ...safeUser } = user; // Exclude password
    res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        user: safeUser, // Only return non-sensitive user data
    });
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    logger.info(`Login attempt: Email: ${email}`);
    if (!email || !password) {
        logger.warn('Login failed: Missing fields');
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = users.find(user => user.email === email);
    if (!user) {
        logger.warn(`Login failed: User not found - Email: ${email}`);
        return res.status(404).json({ error: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        logger.warn(`Login failed: Invalid credentials - Email: ${email}`);
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    logger.info(`Login successful: Email: ${email}`);
    const { password: _, ...safeUser } = user; // Exclude password
    res.status(200).json({
        success: true,
        message: 'Login successful.',
        token,
        user: safeUser, // Only return non-sensitive user data
    });
};

module.exports = { registerUser, loginUser };
