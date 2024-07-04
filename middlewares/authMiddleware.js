const jwt = require('jsonwebtoken');
const { AccessToken } = require('../models');

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = async (req, res, next) => {
  let token = '';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    const accessToken = await AccessToken.findOne({
      where: { access_token: token }
    });
    
    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    req.user = verified;
    req.accessToken = token;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
