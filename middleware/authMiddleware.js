const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header (Bearer token)

  if (!token) {
    return res.status(403).json({ message: 'Access Denied, No Token Provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }
    req.user = user; // Attach the user data to the request
    next(); // Continue to the next middleware or route handler
  });
};

module.exports = {authenticateJWT};
