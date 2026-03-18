import { AppDataSource } from '../../../infrastructure/database/data-source.js';
import { Transaction } from '../../../domain/entities/Transaction.js';
import type { TransactionResponseDTO } from './../../dto/out/TransactionResponseDTO.js';

export class TransactionQueryService {
  private transactionRepository = AppDataSource.getRepository(Transaction);

  async getAllTransactionByUserId(
    userId: string,
  ): Promise<TransactionResponseDTO[] | []> {
    const transactions: Transaction[] = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    return transactions.map((t) => ({
      id: t.id,
      userId: t.user.id,
      amount: t.amount,
      category: t.category,
      type: t.type,
      date: t.date,
    }));
  }
}
