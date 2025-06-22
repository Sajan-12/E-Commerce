const jwt = require('jsonwebtoken');

const fetchUser = async (req, res, next) => {
  try {
    const token = req.header('auth-token');

    if (!token) {
      return res.status(401).json({ success: false, msg: 'Access denied. No token provided.' });
    }

    const data = jwt.verify(token, 'secret_ecom');
    req.userId = data.userId;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: 'Invalid or expired token.' });
  }
};

module.exports = fetchUser;