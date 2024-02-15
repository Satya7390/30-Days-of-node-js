// Import the necessary packages
const express = require('express');

// Create an Express application
const app = express();

// Middleware function to log request details
function loggingMiddleware(req, res, next) {
    console.log('Timestamp:', new Date().toISOString());
    console.log('HTTP Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('--------- Day 15 Completed -----------');
    // Call next middleware in the chain
    next();
}

// Register the logging middleware
app.use(loggingMiddleware);

// Define your routes and other middleware below

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
