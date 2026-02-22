import type { User } from '../entities/User.js';
import { InvalidCredentialsException } from '../exceptions/InvalidCredentialsException.js';
import { isTokenRevoked } from '../../infrastructure/token.store.js';

export const isValidEmail = (email: string) => {
  const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!EMAIL_REGEX.test(email.trim())) {
    throw new Error('Invalid email format');
  }
};

export const verifyPasswordLength = (password: string) => {
  if (password.length < 8) {
    throw new Error('Password must at least 8 characters');
  }
};

export const emailAlreadyTaken = (existingUser: User | null) => {
  if (existingUser) {
    throw new Error('Email already in use');
  }
};

export const verifyFoundUser = (user: User | null, errorMessage: string) => {
  if (!user) throw new InvalidCredentialsException(errorMessage);
};

export const verifyPassword = (isValid: boolean) => {
  if (!isValid) throw new InvalidCredentialsException('Invalid credentials');
};

export const verifyIfTokenIsRevoked = (token: string) => {
  if (isTokenRevoked(token)) {
    throw new Error('');
  }
};
