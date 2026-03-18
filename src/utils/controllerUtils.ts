import { Request, Response, NextFunction } from 'express';

export async function handleControllerError(
  error: any, 
  res: Response, 
  defaultMessage: string = 'Operation failed'
) {
  console.error('Controller error:', error);
  
  // If error has status property, use it
  if (error.status) {
    return res.status(error.status).json({ 
      message: error.message || defaultMessage 
    });
  }
  
  // Handle specific database errors
  if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
    return res.status(503).json({ 
      message: 'Database service unavailable. Please try again later.' 
    });
  }
  
  if (error.code === 'ETIMEDOUT') {
    return res.status(504).json({ 
      message: 'Request timeout. Please try again.' 
    });
  }
  
  // Default error response
  return res.status(500).json({ 
    message: error.message || defaultMessage 
  });
}

export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
