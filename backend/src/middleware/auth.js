const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyToken = (token) => {
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    return verified;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No authentication token' });
    }
    const verified = verifyToken(token);
    if (verified) {
      const user = await User.findById(verified.id);
      if (user) {
        req._id = user._id;
        req.user = user.username;
        req.role = user.role;
        return next();
      }
    } else {
      res.status(401).json({ msg: 'Token verification failed' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Unexpected error occurred' });
  }
};

module.exports = auth;
