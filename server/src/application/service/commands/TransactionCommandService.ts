import { SavingQueryService } from './../queries/SavingQueryService.js';
import { AppDataSource } from '../../../infrastructure/database/data-source.js';
import {
  Transaction,
  TransactionType,
} from '../../../domain/entities/Transaction.js';
import { User } from '../../../domain/entities/User.js';

import type { CreateTransactionDTO } from '../../dto/in/CreateTransactionDTO.js';
import type { TransactionResponseDTO } from './../../dto/out/TransactionResponseDTO.js';
import { SavingCommandService } from './SavingCommandService.js';
import {
  BelowMinimumException,
  RequestSchemaException,
  RequiredFieldMissingValueException,
} from '../../../domain/exceptions/GeneralExceptions.js';

export class TransactionCommandService {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private savingCommandService = new SavingCommandService();
  private savingQueryService = new SavingQueryService();

  async create(
    userId: string,
    dto: CreateTransactionDTO,
  ): Promise<TransactionResponseDTO> {
    const { savingId, amount, category, type } = dto;

    if (!savingId) {
      throw new Error('Saving Id is missing');
    }

    if (!amount || !category || !type) {
      throw new RequestSchemaException(
        'One of the schema does not match with the field domain',
      );
    }

    if (category === '' || (type !== 'income' && type !== 'expense')) {
      throw new RequiredFieldMissingValueException(
        'Not all fields contains a value',
      );
    }

    if (amount <= 0.0) {
      throw new BelowMinimumException(
        'Amount must be greater then 0.0 to create a new transaction',
      );
    }

    const saving = await this.savingQueryService.getSavingById(dto.savingId);

    const currentDate = new Date().toISOString()
    const transaction = this.transactionRepository.create({
      saving: saving,
      amount,
      category,
      type: type as TransactionType,
      date: currentDate
    });

    const savedTransaction = await this.transactionRepository.save(transaction);

    await this.savingCommandService.modifyingSaving(
      userId,
      amount,
      transaction.type,
    );

    return {
      id: savedTransaction.id,
      savingId: savedTransaction.saving.id,
      amount: savedTransaction.amount,
      category: savedTransaction.category,
      type: savedTransaction.type,
      date: savedTransaction.date,
    };
  }
}
