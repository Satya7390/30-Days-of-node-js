const jwt = require('jsonwebtoken');

// Sample users (you can replace this with your actual user data retrieval logic)
const users = [
    { id: 1, username: 'admin', password: 'adminpassword', role: 'admin' },
    { id: 2, username: 'user', password: 'userpassword', role: 'user' }
];

function authenticateAndAuthorize(req, res, next) {
    // Get token from header
    const token = req.header('Authorization');

    // Check if token doesn't exist
    if (!token) {
        return res.status(401).json({ message: 'Access Denied - No token provided' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user from payload
        req.user = decoded;

        // Check if user has required role
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden - Admin access required' });
        }

        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
    }
}

module.exports = authenticateAndAuthorize;
