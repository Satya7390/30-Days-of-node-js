const jwt = require('jsonwebtoken');

// Retrieve the secret key from environment variables
const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';

/**
 * Generate a JWT token
 * @param {Object} payload - Data to be stored in the token
 * @returns {string} JWT token
 */
function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

/**
 * Verify a JWT token
 * @param {string} token - JWT token to be verified
 * @returns {Object} Decoded payload if the token is valid
 */
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};