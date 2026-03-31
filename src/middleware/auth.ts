import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthTokenPayload, Role } from '../types';

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthTokenPayload;
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing token' });
  }
  const token = header.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthTokenPayload;
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function authorize(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}
