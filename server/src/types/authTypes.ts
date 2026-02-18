import { type Request } from 'express';

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface SafeUser {
  id: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: any;
}
