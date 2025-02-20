import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models';

export const userValidator = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  await Promise.all([
    body('name').isString().notEmpty().withMessage('Name is required').run(req),
    body('address').optional().isString().run(req),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format')
      .custom(async (value: string) => {
        const user = await UserModel.findOne({ email: value });
        if (user) {
          throw new Error('Email already exists');
        }
        return true;
      })
      .run(req),
    body('coordinates')
      .optional()
      .isArray({ min: 2, max: 2 })
      .withMessage('Coordinates must be an array of two elements')
      .custom((value: unknown[]) => {
        if (typeof value[0] !== 'number' || typeof value[1] !== 'number') {
          throw new Error('Coordinates must be an array of two numbers');
        }
        return true;
      })
      .run(req),
  ]);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).json({ errors: errors.array() });
  }

  return next();
};
