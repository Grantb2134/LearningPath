const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('userToken');
  console.log('hello');
  if (!token) {
    return res.status(401).json({
      message: 'auth denied, token not found',
    });
  }
  try {
    jwt.verify(JSON.parse(token), process.env.jwtSecurity, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: 'Invalid token',
        });
      }
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
