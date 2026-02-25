import AppException from './AppException.js';

export class InvalidCredentialsException extends AppException {
  constructor(message: string) {
    super(message);
  }
}
