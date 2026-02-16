import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Transaction, TransactionType } from '../types/transactionTypes';
import axios from 'axios';
import { API_URL } from './config';

export const createTransaction = createAsyncThunk<
  Transaction,
  { amount: number; category: string; type: TransactionType }
>('/transaction/create', async (payload) => {
  const token = sessionStorage.getItem('token');

  const res = await axios.post<Transaction>(
    `${API_URL}/transaction/create`,
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
>('/transaction', async (_, { rejectWithValue }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return rejectWithValue('NO_TOKEN');
  }

  try {
    const res = await axios.get<{userTransactions: Transaction[]}>(`${API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.userTransactions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return rejectWithValue(err.response.data || 'Failed to get transactions');
  }
});
