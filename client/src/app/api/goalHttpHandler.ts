import type { Goal, GoalGeneral, UpdateGoal } from './../types/goalTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API_URL } from './config';

export const createGoal = createAsyncThunk<GoalGeneral, Goal>(
  '/goals/create',
  async (payload) => {
    const token = sessionStorage.getItem('token');
    const res = await axios.post<GoalGeneral>(
      `${API_URL}/goals/create`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!res) throw new Error('Something went wrong');

    return res.data;
  },
);

export const getAllGoals = createAsyncThunk<
  GoalGeneral[],
  string,
  { rejectValue: string }
>('/goals', async (savingId, { rejectWithValue }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return rejectWithValue('NO_TOKEN');
  }

  try {
    const res = await axios.get<GoalGeneral[]>(`${API_URL}/goals/${savingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    const axiosError = err as AxiosError<{ error: string }>;
    return rejectWithValue(
      axiosError.response?.data.error || 'Failed to get goals',
    );
  }
});

export const updateGoal = createAsyncThunk<GoalGeneral, UpdateGoal>(
  '/goals/update',
  async ({ id, ...data }) => {
    const token = sessionStorage.getItem('token');
    const res = await axios.put<GoalGeneral>(
      `${API_URL}/goals/update/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  },
);

export const deleteGoal = createAsyncThunk<string, string>(
  '/goals/delete',
  async (id) => {
    const token = sessionStorage.getItem('token');
    const res = await axios.delete(`${API_URL}/goals/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
);
