// app.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());



function authenticateAndAuthorize(req, res, next) {

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer 1234 ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }


    const token = authHeader.split(' ')[1];

    try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

       
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Insufficient privileges.' });
        }

       
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}


// Example protected route
app.get('/admin', authenticateAndAuthorize, (req, res) => {
    res.json({ message: 'Welcome to the admin area!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
