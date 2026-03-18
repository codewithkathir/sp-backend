import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateBody = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.flatten();
    return res.status(400).json({
      message: 'Validation failed',
      errors: {
        fieldErrors: errors.fieldErrors,
        formErrors: errors.formErrors
      }
    });
  }
  req.body = result.data;
  next();
};

export const validateParams = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.params);
  if (!result.success) {
    const errors = result.error.flatten();
    return res.status(400).json({
      message: 'Invalid URL parameters',
      errors: {
        fieldErrors: errors.fieldErrors,
        formErrors: errors.formErrors
      }
    });
  }
  req.params = result.data;
  next();
};
