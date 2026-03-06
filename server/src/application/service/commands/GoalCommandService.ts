import { Goal } from '../../../domain/entities/Goal.js';
import { NotFoundException } from '../../../domain/exceptions/NotFoundException.js';
import { AppDataSource } from '../../../infrastructure/database/data-source.js';

import type { GoalDTO } from '../../dto/in/GoalDTO.js';
import type { GoalResponseDTO } from '../../dto/out/GoalResponseDTO.js';
import {
  createToGoalResponseDTO,
  updateToGoalResponseDTO,
} from '../../mapper/GoalMapper.js';

export class GoalCommandService {
  private goalRepository = AppDataSource.getRepository(Goal);

  async create(userId: string, dto: GoalDTO): Promise<GoalResponseDTO> {
    if (!dto.title) {
      throw new Error('Title is required');
    }

    if (dto.price === 0.0) {
      throw new Error('Savings should be higher than 0.0');
    }

    const currentTime = new Date().toISOString();
    const goal = this.goalRepository.create({
      user: { id: userId },
      title: dto.title,
      description: dto.description,
      price: dto.price,
      createdAt: currentTime,
    });

    const savedGoal = await this.goalRepository.save(goal);
    return createToGoalResponseDTO(savedGoal);
  }

  async update(
    userId: string,
    goalId: string,
    dto: GoalDTO,
  ): Promise<GoalResponseDTO> {
    const goal = await this.goalRepository.findOne({
      where: { id: goalId, user: { id: userId } },
      relations: ['user'],
    });

    if (!goal) throw new NotFoundException('goal not found');

    const currentTime = new Date().toISOString();

    goal.title = dto.title;
    goal.description = dto.description;
    goal.price = dto.price;
    goal.updatedAt = currentTime;

    const savedGoal = await this.goalRepository.save(goal);
    return updateToGoalResponseDTO(savedGoal);
  }

  async delete(userId: string, goalId: string): Promise<void> {
    const result = await this.goalRepository.delete({
      id: goalId,
      user: { id: userId },
    });

    if (result.affected === 0) throw new NotFoundException('Goal not found');
  }
}
