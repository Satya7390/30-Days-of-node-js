const express = require('express');
const app = express();

const cache = {};
const expirationTime = 60000; // Cache expiration time in milliseconds (e.g., 60 seconds)

/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cachingMiddleware(req, res, next) {
  const cacheKey = req.originalUrl;

  // Check if response is cached
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < expirationTime) {
    console.log("Cached response found for:", cacheKey);
    res.send(cache[cacheKey].response);
    return;
  }

  // Cache response
  const originalSend = res.send;
  res.send = (body) => {
    cache[cacheKey] = {
      response: body,
      timestamp: Date.now()
    };
    originalSend.call(res, body);
  };

  next();
}

// Use the caching middleware
app.use(cachingMiddleware);

// Define a route
app.get('/data', (req, res) => {
  // Simulated delay to see caching in action
  setTimeout(() => {
    res.send("Response from server");
    console.log('Hii');
  }, 2000);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
