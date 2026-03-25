import {
  createGoal,
  deleteGoal,
  getAllGoals,
  updateGoal,
} from './../api/goalHttpHandler';

import type { AppDispatch } from '../store/store';
import type { Goal, UpdateGoal } from '../types/goalTypes';

export const createGoalController = async (
  dispatch: AppDispatch,
  data: Goal,
) => {
  dispatch(createGoal(data)).unwrap();
};

export const getAllGoalsController = async (
  dispatch: AppDispatch,
  savingId: string,
) => {
  if (!savingId) return
  dispatch(getAllGoals(savingId)).unwrap();
};

export const updateGoalController = async (
  dispatch: AppDispatch,
  data: UpdateGoal,
) => {
  dispatch(updateGoal(data)).unwrap();
};

export const deleteGoalController = async (
  dispatch: AppDispatch,
  id: string,
) => {
  dispatch(deleteGoal(id)).unwrap();
};
