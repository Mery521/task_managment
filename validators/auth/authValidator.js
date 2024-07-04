const { body } = require('express-validator');

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = {
  validateLogin,
};
