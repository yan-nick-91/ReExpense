import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '../../types/authTypes';
import {
  login,
  register,
  isAuthenticated,
  logout,
} from '../../api/authHttpHandler';

const initialState: AuthState = {
  user: undefined,
  isAuthenticated: false,
  error: undefined,
  loading: true
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(isAuthenticated.pending, (state) => {
        state.loading = true
      })
      .addCase(isAuthenticated.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false
      })
      .addCase(isAuthenticated.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = undefined;
        state.loading = false
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = undefined;
        state.loading = false
      });
  },
});

export default authSlice.reducer;
