import { query } from 'express-validator';

// Some weird validations but ok
export const queryValidateMiddleware = [
  query('page').not().isEmpty().withMessage('Page cannot be empty'),
  query('country')
    .exists()
    .withMessage('Country is required')
    .not()
    .isEmpty()
    .withMessage('Country cannot be empty'),
  query('errorsCount')
    .exists()
    .withMessage('Errors count is required')
    .not()
    .isEmpty()
    .withMessage('Errors count cannot be empty'),
  query('seed')
    .exists()
    .withMessage('Errors count is required')
    .not()
    .isEmpty()
    .withMessage('Seed cannot be empty'),
];
