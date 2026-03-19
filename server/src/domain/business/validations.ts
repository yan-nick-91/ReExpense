import type { User } from '../entities/User.js';
import {
  EmailAlreadyUsedException,
  InvalidCredentialsException,
  InvalidEmailException,
  InvalidPasswordLengthException,
} from '../exceptions/AuthenticationExceptions.js';

export const isValidEmail = (email: string) => {
  const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!EMAIL_REGEX.test(email.trim())) {
    throw new InvalidEmailException('Invalid email format');
  }
};

export const verifyPasswordLength = (password: string) => {
  const MINIMUM_PASSWORD_LENGTH = 8;
  if (password.length < MINIMUM_PASSWORD_LENGTH) {
    throw new InvalidPasswordLengthException(
      'Password must at least be 8 characters',
    );
  }
};

export const emailAlreadyTaken = (existingUser: User | null) => {
  if (existingUser || existingUser !== null) {
    throw new EmailAlreadyUsedException('Email already in use');
  }
};

export const verifyFoundUser = (user: User | null, errorMessage: string) => {
  if (!user) throw new InvalidCredentialsException(errorMessage);
};

export const verifyPassword = (isValid: boolean) => {
  if (!isValid) throw new InvalidCredentialsException('Invalid credentials');
};

export const verifyPasswordEquals = (currentPassword: string, newPassword: string) => {
  if (currentPassword === newPassword) {
    throw new InvalidCredentialsException('New password cannot be equals as the current password')
  }
}