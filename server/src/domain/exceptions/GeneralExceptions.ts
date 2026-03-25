import AppException from './AppException.js';

export class RequiredFieldMissingValueException extends AppException {
  constructor(message: string) {
    super(message);
  }
}

export class BelowMinimumException extends AppException {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundException extends AppException {
  constructor(message: string) {
    super(message);
  }
}

export class RequestSchemaException extends AppException {
  constructor(message: string) {
    super(message)
  }
}
