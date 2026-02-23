import { AppDataSource } from '../../../infrastructure/database/data-source.js';
import {
  Transaction,
  TransactionType,
} from '../../../domain/entities/Transaction.js';
import { User } from '../../../domain/entities/User.js';

import type { CreateTransactionDTO } from '../../dto/in/CreateTransactionDTO.js';
import type { TransactionResponseDTO } from './../../dto/out/TransactionResponseDTO.js';

export class TransactionCommandService {
  private transactionRepository = AppDataSource.getRepository(Transaction);

  async create(
    userId: string,
    dto: CreateTransactionDTO,
  ): Promise<TransactionResponseDTO> {
    const { amount, category, type } = dto;

    if (!amount || !category || !type) {
      throw new Error('Not all fields contains a value');
    }

    if (amount <= 0.0) {
      throw new Error(
        'Amount must be greater then 0.0 to create a new transaction',
      );
    }

    const transaction = this.transactionRepository.create({
      user: { id: userId } as User,
      amount,
      category,
      type: type as TransactionType,
    });

    const savedTransaction = await this.transactionRepository.save(transaction);

    return {
      id: savedTransaction.id,
      userId: savedTransaction.user.id,
      amount: +savedTransaction.amount,
      category: savedTransaction.category,
      type: savedTransaction.type,
      date: savedTransaction.date,
    };
  }
}
