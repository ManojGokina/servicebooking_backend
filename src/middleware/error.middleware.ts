import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    logger.error(`API Error: ${err.message}`, { 
      statusCode: err.statusCode,
      stack: err.stack 
    });
    
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  // Handle unexpected errors
  logger.error('Unexpected Error:', err);
  
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};