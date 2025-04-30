const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      logger.warn('Authentication failed: No token provided', {
        path: req.path,
        method: req.method
      });
      return res.status(401).json({ error: 'Please log in to access this feature' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      logger.warn('Authentication failed: User not found', {
        userId: decoded.userId,
        path: req.path,
        method: req.method
      });
      return res.status(401).json({ error: 'Session expired. Please log in again' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    // Log structured error with context but without sensitive details
    logger.error('Authentication error', error, {
      path: req.path,
      method: req.method,
      errorType: error.name
    });
    
    res.status(401).json({ error: 'Your session has expired. Please log in again' });
  }
};

module.exports = auth; 