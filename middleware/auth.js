const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Token from header
  const token = req.header('userToken');

  // Check if there is token in the header
  if (!token) {
    return res.status(401).json({
      message: 'auth denied, token not found',
    });
  }
  // Token verification
  try {
    jwt.verify(JSON.parse(token), process.env.jwtSecurity, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: 'Invalid token',
        });
      }
      // Pass the decoded user to req.user
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    console.error('error w/ the middleware');
    res.status(500).json({
      message: 'Server error',
    });
  }
};

module.exports = auth;
