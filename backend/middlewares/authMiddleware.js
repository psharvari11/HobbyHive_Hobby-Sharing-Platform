const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken.js');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; 

  const blacklisted = await BlacklistedToken.findOne({ token });
  if (blacklisted) return res.status(401).json({ msg: 'Token has been logged out' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = authMiddleware;
