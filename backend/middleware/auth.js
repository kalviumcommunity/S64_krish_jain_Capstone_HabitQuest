const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Please log in to access this feature' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(401).json({ error: 'Session expired. Please log in again' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log('❌ Auth error:', error.message);
    res.status(401).json({ error: 'Your session has expired. Please log in again' });
  }
};

module.exports = auth; 