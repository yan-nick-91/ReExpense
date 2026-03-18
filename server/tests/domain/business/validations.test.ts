import { User } from '../../../src/domain/entities/User';
import {
  EmailAlreadyUsedException,
  InvalidCredentialsException,
  InvalidEmailException,
  InvalidPasswordLengthException,
} from '../../../src/domain/exceptions/AuthenticationExceptions';
import {
  emailAlreadyTaken,
  isValidEmail,
  verifyFoundUser,
  verifyPassword,
  verifyPasswordLength,
} from './../../../src/domain/business/validations';
import { describe, it, expect } from 'vitest';

describe('Business validations', () => {
  it('should not throw an error when email has a correct pattern', () => {
    expect(() => isValidEmail('john.testing@test.com')).not.toThrow();
  });

  it.each([
    'notanemail',
    'missing@dot',
    '@nodomain.com',
    'no spaces@test.com',
    '.com',
    'noatsign.com',
  ])('should throw an InvalidEmailException for invalid email: %s', (email) => {
    expect(() => isValidEmail(email)).toThrow(InvalidEmailException);
  });

  it('should display an error message with an invalid email', () => {
    expect(() => isValidEmail('notvalid.com')).toThrow('Invalid email format');
  });

  it.each(['Te$ting1', 'Te$ting12'])(
    'should not throw an exception with the length of this password: %s',
    (password) => {
      expect(() => verifyPasswordLength(password)).not.toThrow();
    },
  );

  it('should throw an InvalidPasswordLengthException if the length is below its minimum', () => {
    expect(() => verifyPasswordLength('testing')).toThrow(
      InvalidPasswordLengthException,
    );
    expect(() => verifyPasswordLength('testing')).toThrow(
      'Password must at least be 8 characters',
    );
  });

  it('should not throw an exception if email is not used', () => {
    expect(() => emailAlreadyTaken(null)).not.toThrow();
  });

  it('should throw an EmailAlreadyUsedException if the email is in use', () => {
    const existingUser = { id: '1', email: 'test@test.com' } as User;
    expect(() => emailAlreadyTaken(existingUser)).toThrow(
      EmailAlreadyUsedException,
    );
    expect(() => emailAlreadyTaken(existingUser)).toThrow(
      'Email already in use',
    );
  });

  it('should not throw an exception if a user was found during login process', () => {
    const foundUser = new User();
    expect(() => verifyFoundUser(foundUser, '')).not.toThrow();
  });

  it('should throw an InvalidCredentialsException if a user was not found during login process', () => {
    expect(() => verifyFoundUser(null, 'Invalid credentials')).toThrow(
      InvalidCredentialsException,
    );
    expect(() => verifyFoundUser(null, 'Invalid credentials')).toThrow(
      'Invalid credentials',
    );
  });

  it('should not throw an exception if the password is valid', () => {
    expect(() => verifyPassword(true)).not.toThrow();
  });

  it('should throw an InvalidCredentialsException if the password is invalid', () => {
    expect(() => verifyPassword(false)).toThrow('Invalid credentials');
  });
});
