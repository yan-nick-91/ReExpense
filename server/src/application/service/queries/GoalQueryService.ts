import { Goal } from '../../../domain/entities/Goal.js';
import { AppDataSource } from '../../../infrastructure/database/data-source.js';
import type { GoalResponseDTO } from '../../dto/out/GoalResponseDTO.js';
import { toGeneralGoalResponseDTO } from '../../mapper/GoalMapper.js';

export class GoalQueryService {
  private goalRepository = AppDataSource.getRepository(Goal);

  async getAllGoalsByUserId(userId: string): Promise<GoalResponseDTO[] | []> {
    const goals: Goal[] = await this.goalRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    return goals.map((goal) => toGeneralGoalResponseDTO(goal));
  }
}
