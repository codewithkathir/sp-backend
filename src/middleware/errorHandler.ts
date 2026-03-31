import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  // Log error details
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    user: req.user?.userId,
    timestamp: new Date().toISOString()
  });

  // Handle different types of errors
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types
  if (err.code === 'ER_DUP_ENTRY') {
    status = 409;
    message = 'Duplicate entry';
  } else if (err.code === 'ER_NO_SUCH_TABLE') {
    status = 500;
    message = 'Database table not found';
  } else if (err.code === 'ECONNREFUSED') {
    status = 503;
    message = 'Database connection failed';
  }

  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && status === 500) {
    message = 'Internal Server Error';
  }

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}
