import { AppDataSource } from '../../../infrastructure/database/data-source.js';
import { Saving } from '../../../domain/entities/Saving.js';
import type { SavingResponseDTO } from '../../dto/out/SavingResponseDTO.js';

export class SavingQueryService {
  private getRepository = AppDataSource.getRepository(Saving);

  async getAllSavingBalances(userId: string): Promise<SavingResponseDTO[]> {
    const savings = await this.getRepository
      .createQueryBuilder('saving')
      .leftJoinAndSelect('saving.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    return savings.map((saving) => {
      return { id: saving.id, name: saving.name, balance: saving.balance };
    });
  }
}
