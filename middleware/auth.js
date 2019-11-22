const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // extracts the token from the request header
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); //  decodes the token
    const { userId } = decodedToken;
    req.user = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error('Invalid user ID');
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: 'User must be authenticated',
    });
  }
};
