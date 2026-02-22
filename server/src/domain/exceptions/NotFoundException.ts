import AppException from './AppException.js';

export class NotFoundException extends AppException {
  constructor(message: string) {
    super(message);
  }
}
