import AppException from './AppException.js';

export class AlreadyExistsException extends AppException {
  constructor(message: string) {
    super(message);
  }
}
