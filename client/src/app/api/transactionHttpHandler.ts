import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Transaction, TransactionType } from '../types/transactionTypes';
import axios, { AxiosError } from 'axios';
import { API_URL } from './config';

export const createTransaction = createAsyncThunk<
  Transaction,
  { amount: number; category: string; type: TransactionType },
  { rejectValue: string }
>('/transactions/create', async (payload, { rejectWithValue }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return rejectWithValue("No token")
  }

  try {
    const res = await axios.post<Transaction>(
      `${API_URL}/transactions/create`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (err) {
    const axiosError = err as AxiosError<{ error: string }>;
    return rejectWithValue(
      axiosError.response?.data.error || 'Failed to fullfil the process',
    );
  }
});

export const getAllTransaction = createAsyncThunk<
  Transaction[],
  string,
  { rejectValue: string }
>('/transactions', async (savingId, { rejectWithValue }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return rejectWithValue('No token');
  }

  try {
    const res = await axios.get<Transaction[]>(
      `${API_URL}/transactions/${savingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (err) {
    const axiosError = err as AxiosError<{ error: string }>;
    return rejectWithValue(
      axiosError.response?.data.error || 'Failed to get transactions',
    );
  }
});
