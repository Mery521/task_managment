const { query } = require('express-validator');

const paginationValidator = [
  query('limit')
    .optional()
    .isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('offset')
    .optional()
    .isInt({ min: 0 }).withMessage('Offset must be a non-negative integer'),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer')
];

module.exports = paginationValidator; 