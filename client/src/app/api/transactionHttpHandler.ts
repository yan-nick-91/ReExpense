import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Transaction, TransactionType } from '../types/transactionTypes';
import axios, { AxiosError } from 'axios';
import { API_URL } from './config';

export const createTransaction = createAsyncThunk<
  Transaction,
  { amount: number; category: string; type: TransactionType }
>('/transactions/create', async (payload) => {
  const token = sessionStorage.getItem('token');

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
});

export const getAllTransaction = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>('/transactions', async (_, { rejectWithValue }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return rejectWithValue('NO_TOKEN');
  }

  try {
    const res = await axios.get<{ userTransactions: Transaction[] }>(
      `${API_URL}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data.userTransactions;
  } catch (err) {
    const axiosError = err as AxiosError<{ error: string }>;
    return rejectWithValue(
      axiosError.response?.data.error || 'Failed to get transactions',
    );
  }
});
