import { Saving } from '../../../domain/entities/Saving.js';
import type { TransactionType } from '../../../domain/entities/Transaction.js';
import { NotFoundException } from '../../../domain/exceptions/GeneralExceptions.js';
import { InsufficientAmountException } from '../../../domain/exceptions/InsufficientAmountException.js';
import { AppDataSource } from '../../../infrastructure/database/data-source.js';

export class SavingCommandService {
  private savingRepository = AppDataSource.getRepository(Saving);

  async initializeFirstSaving(userId: string): Promise<void> {
    const saving = this.savingRepository.create({
      user: { id: userId },
      name: 'General',
      balance: 0.0,
    });
    await this.savingRepository.save(saving);
  }

  async modifyingSaving(
    userId: string,
    amount: number,
    type: TransactionType,
  ): Promise<Saving> {
    const saving = await this.savingRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!saving) throw new NotFoundException('Saving not found');

    if (type === 'income') {
      saving.balance += amount;
    } else if (type === 'expense') {
      if (saving.balance < amount)
        throw new InsufficientAmountException('Not enough balance');
      saving.balance -= amount;
    }

    await this.savingRepository.save(saving);
    return saving;
  }
}
