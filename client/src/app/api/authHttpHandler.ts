import { createAsyncThunk } from '@reduxjs/toolkit';
import { type SafeUser } from '../types/authTypes';
import axios from 'axios';

import { API_URL } from './config';

export const register = createAsyncThunk<
  { token: string },
  { email: string; password: string }
>('auth/register', async ({ email, password }) => {
  const res = await axios.post<{ user: SafeUser; token: string }>(
    `${API_URL}/register`,
    { email, password },
    { withCredentials: true },
  );

  if (!res) {
    throw new Error('something went wrong');
  }

  sessionStorage.setItem('token', res.data.token);

  return { token: res.data.token };
});

export const login = createAsyncThunk<
  { token: string },
  { email: string; password: string }
>('auth/login', async ({ email, password }) => {
  const res = await axios.post<{ user: SafeUser; token: string }>(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true },
  );

  if (!res) {
    throw new Error('Something went wrong');
  }

  sessionStorage.setItem('token', res.data.token);

  return { token: res.data.token };
});

export const isAuthenticated = createAsyncThunk<
  SafeUser,
  void,
  { rejectValue: string }
>('/auth/isAuthenticated', async (_, { rejectWithValue }) => {
  const token = sessionStorage.getItem('token');

  if (!token) throw rejectWithValue('NO_TOKEN');

  try {

    const res = await axios.post<{ user: SafeUser }>(
      `${API_URL}/authenticated`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data.user;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return rejectWithValue(err.response.data.error || 'Failed auth')
  }
});

export const logout = createAsyncThunk<void, { token: string }>(
  'auth/logout',
  async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Something went wrong during logout request');
    }
    await axios.delete(`${API_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    sessionStorage.removeItem('token');
  },
);
