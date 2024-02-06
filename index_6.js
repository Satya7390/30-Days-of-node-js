/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
    const name = req.query.name || 'Guest';
    res.send(`Hello, ${name}!`);
}

// Test Cases:

// Request to /greet?name=John should return "Hello, John!"
greetHandler(
    { query: { name: "John" } },
    { send: (message) => console.log(message) }
);

// Request to /greet should return "Hello, Guest!"
greetHandler(
    { query: {} },
    { send: (message) => console.log(message) }
);
