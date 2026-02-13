import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import type { AuthRequest } from '../../types/authTypes.js';
import { JWT_SECRET } from '../config/config.js';
import { isTokenRevoked } from '../../infrastructure/token.store.js';

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
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
