const { body } = require('express-validator');

const createTaskValidator = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .trim(),
  body('status')
    .optional()
    .isIn(['1', '2']) //1 - active, 2 - inactive
    .withMessage('Status must be one of: active or inactive')
    .trim()
];

module.exports = createTaskValidator;
