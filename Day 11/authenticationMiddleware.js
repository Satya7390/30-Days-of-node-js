// Correct relative path if both files are in the same directory
const { verifyToken } = require('./jwtUtil');


/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticationMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No JWT provided' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized - Invalid JWT' });
  }

  // Attach the decoded payload to the request for further use
  req.user = decoded;

  // Proceed to the next middleware or route handler
  next();
}

module.exports = authenticationMiddleware;