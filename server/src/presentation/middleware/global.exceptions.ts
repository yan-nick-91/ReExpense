import type { NextFunction, Request, Response } from 'express';
import AppException from '../../domain/exceptions/AppException.js';
import {
  AlreadyExistsException,
  BelowMinimumException,
  IllegalRequestException,
  NotFoundException,
  RequestSchemaException,
  RequiredFieldMissingValueException,
} from '../../domain/exceptions/GeneralExceptions.js';
import {
  BalanceNotEmptyBeforeDeletionException,
  InsufficientAmountException,
} from '../../domain/exceptions/SavingExceptions.js';
import {
  EmailAlreadyUsedException,
  InvalidCredentialsException,
  InvalidEmailException,
  InvalidPasswordLengthException,
  TokenException,
} from '../../domain/exceptions/AuthenticationExceptions.js';

type ExceptionConstructor = new (...args: any[]) => AppException;

const exceptionStatusMap = new Map<ExceptionConstructor, number>([
  [NotFoundException, 404],
  [AlreadyExistsException, 409],
  [InvalidEmailException, 400],
  [EmailAlreadyUsedException, 409],
  [InvalidCredentialsException, 400],
  [InvalidPasswordLengthException, 400],
  [TokenException, 409],
  [InsufficientAmountException, 409],
  [IllegalRequestException, 400],
  [RequiredFieldMissingValueException, 409],
  [RequestSchemaException, 400],
  [BelowMinimumException, 400],
  [RequestSchemaException, 400],
  [BalanceNotEmptyBeforeDeletionException, 409],
]);

const resolveStateCode = (err: AppException): number => {
  for (const [ExceptionClass, status] of exceptionStatusMap.entries()) {
    if (err instanceof ExceptionClass) {
      return status;
    }
  }
  return 400;
};

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppException) {
    const statusCode = resolveStateCode(err);

    return res.status(statusCode).json({
      message: err.message,
      type: err.name,
    });
  }
  console.log('Unexpected error:', err);
  return res.status(500).json;
};
