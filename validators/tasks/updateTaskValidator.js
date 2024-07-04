const { body, param } = require('express-validator');

const updateTaskValidator = [
  param('id')
    .isInt().withMessage('Task ID must be an integer'),
  body('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .trim(),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .trim(),
  body('status')
    .optional()
    .isIn(['1', '2']) //1 - active, 2 - inactive
    .withMessage('Status must be one of: Active or Inactive')
    .trim()
];

module.exports = updateTaskValidator;
