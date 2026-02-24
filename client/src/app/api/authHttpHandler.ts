import { createAsyncThunk } from '@reduxjs/toolkit';
import { type SafeUser } from '../types/authTypes';
import axios, { AxiosError } from 'axios';

import { API_URL } from './config';

export const register = createAsyncThunk<
  { token: string },
  { email: string; password: string }
>('/auth/register', async ({ email, password }) => {
  const res = await axios.post<{ user: SafeUser; token: string }>(
    `${API_URL}/auth/register`,
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
>('/auth/login', async ({ email, password }) => {
  const res = await axios.post<{ user: SafeUser; token: string }>(
    `${API_URL}/auth/login`,
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
    const res = await axios.get<{ user: SafeUser }>(
      `${API_URL}/auth/authenticated`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data.user;
  } catch (err) {
    const axiosError = err as AxiosError<{ error: string }>;
    return rejectWithValue(axiosError.response?.data.error || 'Failed auth');
  }
});

export const updatePassword = createAsyncThunk<
  { token: string },
  { currentPassword: string; newPassword: string }
>(
  'auth/update/password',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        throw new Error(
          'Something went wrong sending request to update password',
        );
      }

      const response = await axios.put(
        `${API_URL}/auth/update/password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data as { token: string };
      sessionStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;

      if (axiosError.response?.data.error) {
        return rejectWithValue(axiosError.response?.data.error);
      }
      return rejectWithValue(
        axiosError.response?.data.error || 'Failed to update password',
      );
    }
  },
);

export const forgotPassword = createAsyncThunk<void, { email: string }>(
  '/auth/forgot/password',
  async ({ email }) => {
    const response = await axios.post(`${API_URL}/auth/forgot/password`, {
      email,
    });

    return response.data;
  },
);

export const validateResetToken = createAsyncThunk<void, { token: string }>(
  'auth/reset/token/validate',
  async ({ token }) => {
    const response = await axios.get(`${API_URL}/auth/reset/validate/${token}`);
    return response.data;
  },
);

export const resetForgottenPassword = createAsyncThunk<
  void,
  { newPassword: string }
>('auth/reset/password', async ({ newPassword }) => {
  const response = await axios.post(`${API_URL}/auth/reset/password`, {
    newPassword,
  });
  return response.data;
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  '/auth/logout',
  async (_, { rejectWithValue }) => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw rejectWithValue('Something went wrong during logout request');
    }
    await axios.delete(`${API_URL}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    sessionStorage.removeItem('token');
  },
);
