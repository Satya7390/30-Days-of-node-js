const express = require('express');
const app = express(); // Create an instance of Express
const port = 3000;
// Define your middleware function
// Apply the middleware to all incoming requests
app.use(requestLoggerMiddleware);
function requestLoggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  console.log(`${timestamp} - ${method} request received`);
  next();
}



// Define route handler for the root endpoint
app.get("/", (req, res) => {
  res.send('Hello, Satya!');
});

// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});