import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors.map(err => err.message).join(', ');
      return next(new ApiError(400, errorMessage));
    }
    next(error);
  }
};
