import { createSlice } from '@reduxjs/toolkit';
import type { GoalGeneral } from '../../types/goalTypes';
import {
  createGoal,
  deleteGoal,
  getAllGoals,
  updateGoal,
} from '../../api/goalHttpHandler';
type GoalState = {
  items: GoalGeneral[];
  loading: boolean;
  error: string | undefined;
  success: boolean;
};

const initialState: GoalState = {
  items: [],
  loading: false,
  error: undefined,
  success: false,
};

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
        state.success = true;
      })
      .addCase(createGoal.rejected, (state) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(getAllGoals.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAllGoals.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getAllGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateGoal.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const index = state.items.findIndex(
          (goal) => goal.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload,
            createdAt: state.items[index].createdAt
          }
        }
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteGoal.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default goalSlice.reducer;
