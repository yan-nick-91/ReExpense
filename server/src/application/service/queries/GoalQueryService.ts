import { Goal } from '../../../domain/entities/Goal.js';
import { AppDataSource } from '../../../infrastructure/database/data-source.js';
import type { GoalResponseDTO } from '../../dto/out/GoalResponseDTO.js';
import { toGeneralGoalResponseDTO } from '../../mapper/GoalMapper.js';

export class GoalQueryService {
  private goalRepository = AppDataSource.getRepository(Goal);

  async getAllGoalsBySavingId(
    userId: string,
    savingId: string,
  ): Promise<GoalResponseDTO[] | []> {
    const goals: Goal[] = await this.goalRepository
      .createQueryBuilder('goal')
      .leftJoinAndSelect('goal.saving', 'saving')
      .leftJoin('saving.user', 'user')
      .where('saving.id = :savingId', { savingId })
      .andWhere('user.id = :userId', { userId })
      .getMany();
    return goals.map((goal) => toGeneralGoalResponseDTO(goal));
  }
}
