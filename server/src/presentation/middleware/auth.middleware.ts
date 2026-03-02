import type { Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config/config.js';

import type { AuthRequest } from '../../types/authTypes.js';
import { isTokenRevoked } from '../../infrastructure/token.store.js';
import type { User } from '../../domain/entities/User.js';

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token' });

  const [scheme, token] = authHeader.split(' ');
  if (!token || scheme !== 'Bearer') {
    return res.status(401).json({ error: 'Malformed authorization header' });
  }

  if (isTokenRevoked(token)) {
    return res.status(401).json({ error: 'Token has been revoked' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload as User;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
