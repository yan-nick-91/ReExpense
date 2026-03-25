import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Saving } from '../types/savingType';
import axios, { AxiosError } from 'axios';
import { API_URL } from './config';

export const getAllSavingBalances = createAsyncThunk<
  Saving[],
  void,
  { rejectValue: string }
>('/savings', async (_, { rejectWithValue }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return rejectWithValue('NO_TOKEN');
  }

  try {
    const res = await axios.get<Saving[]>(`${API_URL}/savings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    const axiosError = err as AxiosError<{ error: string }>;
    return rejectWithValue(
      axiosError.response?.data.error || 'Failed to get savings',
    );
  }
});

export const requestSpecificSavingBySavingId = createAsyncThunk<
  Saving,
  string,
  { rejectValue: string }
>('/saving', async (savingId, { rejectWithValue }) => {
  const token = sessionStorage.getItem('token');

  try {
    const res = await axios.get<Saving>(`${API_URL}/savings/${savingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    const axiosError = err as AxiosError<{ error: string }>;
    return rejectWithValue(
      axiosError.response?.data.error || 'Failed to get savings',
    );
  }
});

// export const currentSavingBalanceBySavingId = createAsyncThunk<Saving, void, {rejectValue: string}>('')
