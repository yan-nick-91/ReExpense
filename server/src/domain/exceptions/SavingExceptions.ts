import AppException from './AppException.js';

export class InsufficientAmountException extends AppException {
  constructor(message: string) {
    super(message);
  }
}

export class BalanceNotEmptyBeforeDeletionException extends AppException {
  constructor(message: string) {
    super(message);
  }
}
