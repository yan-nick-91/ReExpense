import { AppDataSource } from '../../../infrastructure/database/data-source.js';
import { Transaction } from '../../../domain/entities/Transaction.js';
import type { TransactionResponseDTO } from './../../dto/out/TransactionResponseDTO.js';

export class TransactionQueryService {
  private transactionRepository = AppDataSource.getRepository(Transaction);

  async getAllTransactionBySavingId(
    savingId: string,
  ): Promise<TransactionResponseDTO[] | []> {
    const transactions: Transaction[] = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.saving', 'saving')
      .where('saving.id = :savingId', { savingId })
      .getMany();

    return transactions.map((t) => ({
      id: t.id,
      savingId: savingId,
      amount: t.amount,
      category: t.category,
      type: t.type,
      date: t.date,
    }));
  }
}
