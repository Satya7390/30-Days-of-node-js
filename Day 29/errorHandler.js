
const createError = require('http-errors');

function errorHandler(err, req, res, next) {
    // Log the error for debugging purposes
    console.error(err);

    // Check if the error is an instance of HttpError from http-errors
    if (err instanceof createError.HttpError) {
        res.status(err.status || 500).json({ error: err.message });
    } else {
        // If it's not a known HTTP error, return a generic 500 Internal Server Error
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = errorHandler;
