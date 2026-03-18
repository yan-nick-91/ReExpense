import AppException from './AppException.js';

export class EmailAlreadyUsedException extends AppException {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidEmailException extends AppException {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidCredentialsException extends AppException {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidPasswordLengthException extends AppException {
  constructor(message: string) {
    super(message);
  }
}

export class TokenException extends AppException {
  constructor(message: string) {
    super(message);
  }
}
