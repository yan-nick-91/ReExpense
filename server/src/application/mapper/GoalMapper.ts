import type { GoalDTO } from '../dto/in/GoalDTO.js';
import type { Goal } from '../../domain/entities/Goal.js';
import type { GoalResponseDTO } from '../dto/out/GoalResponseDTO.js';

export const toUpdateGoal = (dto: GoalDTO) => {
  return {
    title: dto.title,
    description: dto.description,
    savings: dto.savings,
  };
};

export const createToGoalResponseDTO = (goal: Goal): GoalResponseDTO => {
  return {
    id: goal.id,
    userId: goal.user.id,
    title: goal.title,
    description: goal.description!,
    savings: goal.savings,
    createdAt: goal.createdAt,
  };
};

export const updateToGoalResponseDTO = (goal: Goal): GoalResponseDTO => {
  return {
    id: goal.id,
    userId: goal.user.id,
    title: goal.title,
    description: goal.description!,
    savings: goal.savings,
    updatedAt: goal.updatedAt!,
  };
};

export const toGeneralGoalResponseDTO = (goal: Goal): GoalResponseDTO => {
  return {
    id: goal.id,
    userId: goal.user.id,
    title: goal.title,
    description: goal.description!,
    savings: goal.savings,
    createdAt: goal.createdAt,
    updatedAt: goal.updatedAt!,
  };
};
