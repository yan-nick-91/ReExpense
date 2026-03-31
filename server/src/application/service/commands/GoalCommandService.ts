import { Goal } from '../../../domain/entities/Goal.js';
import { NotFoundException } from '../../../domain/exceptions/GeneralExceptions.js';
import { AppDataSource } from '../../../infrastructure/database/data-source.js';

import type { GoalDTO } from '../../dto/in/GoalDTO.js';
import type { GoalResponseDTO } from '../../dto/out/GoalResponseDTO.js';
import {
  createToGoalResponseDTO,
  updateToGoalResponseDTO,
} from '../../mapper/GoalMapper.js';
import { SavingQueryService } from '../queries/SavingQueryService.js';

export class GoalCommandService {
  private goalRepository = AppDataSource.getRepository(Goal);
  private savingQueryService = new SavingQueryService();

  async create(dto: GoalDTO): Promise<GoalResponseDTO> {
    const { savingId, title, description, targetAmount } = dto;

    if (!savingId) {
      throw new Error('Saving Id is missing');
    }

    if (!title) {
      throw new Error('Title is required');
    }

    if (targetAmount <= 0.0) {
      throw new Error('Savings must be higher than 0.0');
    }

    const saving = await this.savingQueryService.getSavingBySavingId(savingId);

    const currentDate = new Date().toISOString();
    const goal = this.goalRepository.create({
      title,
      description,
      targetAmount,
      saving: saving,
      createdAt: currentDate,
    });

    const savedGoal = await this.goalRepository.save(goal);
    return createToGoalResponseDTO(savedGoal);
  }

  async update(goalId: string, dto: GoalDTO): Promise<GoalResponseDTO> {
    const { title, description, targetAmount } = dto;
    const goal = await this.goalRepository.findOne({
      where: { id: goalId, saving: { id: dto.savingId! } },
      relations: ['saving'],
    });

    if (!goal) throw new NotFoundException('Goal not found');

    goal.title = title;
    goal.description = description;
    goal.targetAmount = targetAmount;
    goal.updatedAt = new Date().toISOString();

    const savedGoal = await this.goalRepository.save(goal);
    return updateToGoalResponseDTO(savedGoal);
  }

  async delete(userId: string, goalId: string): Promise<void> {
    const goal = await this.goalRepository.findOne({
      where: {
        id: goalId,
        saving: {
          user: {
            id: userId,
          },
        },
      },
      relations: ['saving', 'saving.user'],
    });

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    await this.goalRepository.remove(goal);
  }
}
