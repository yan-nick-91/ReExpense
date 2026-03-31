import { Saving } from '../../../domain/entities/Saving.js';
import { SavingQueryService } from './../queries/SavingQueryService.js';
import type { TransactionType } from '../../../domain/entities/Transaction.js';
import {
  AlreadyExistsException,
  IllegalRequestException,
  NotFoundException,
} from '../../../domain/exceptions/GeneralExceptions.js';
import { AppDataSource } from '../../../infrastructure/database/data-source.js';
import type { CreateSavingDTO } from '../../dto/in/CreateSavingDTO.js';
import {
  BalanceNotEmptyBeforeDeletionException,
  InsufficientAmountException,
} from '../../../domain/exceptions/SavingExceptions.js';

export class SavingCommandService {
  private savingRepository = AppDataSource.getRepository(Saving);
  private savingQueryService = new SavingQueryService();

  async initializeFirstSaving(userId: string): Promise<void> {
    const saving = this.savingRepository.create({
      user: { id: userId },
      name: 'General',
      balance: 0.0,
    });
    await this.savingRepository.save(saving);
  }

  async createNewSaving(userId: string, dto: CreateSavingDTO) {
    const { name, balance } = dto;

    const existingSaving = await this.savingRepository.findOne({
      where: {
        user: { id: userId },
        name: name,
      },
      relations: ['user'],
    });

    if (existingSaving) {
      throw new AlreadyExistsException('Name for saving is already taken');
    }

    const newSaving = this.savingRepository.create({
      user: { id: userId },
      name,
      balance,
    });

    await this.savingRepository.save(newSaving);
    return {
      id: newSaving.id,
      name: newSaving.name,
      balance: newSaving.balance,
    };
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
    } else {
      throw new Error('Invalid transaction type')
    }

    await this.savingRepository.save(saving);
    return saving;
  }

  async deleteSaving(savingId: string) {
    const saving = await this.savingQueryService.getSavingBySavingId(savingId);

    if (!saving) throw new NotFoundException('Saving not found');

    if (saving.name === 'General') {
      throw new IllegalRequestException('Not allowed remove General saving');
    }

    if (saving.balance !== 0.0) {
      throw new BalanceNotEmptyBeforeDeletionException(
        'Cannot delete saving with a non empty balance',
      );
    }
    this.savingRepository.remove(saving);
  }
}
