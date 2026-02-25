import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '../../types/authTypes';
import {
  login,
  register,
  isAuthenticated,
  updatePassword,
  logout,
  validateResetToken,
  resetForgottenPassword,
} from '../../api/authHttpHandler';

const initialState: AuthState = {
  user: undefined,
  isAuthenticated: false,
  error: undefined,
  loading: true,
  success: false,
  resetTokenStatus: 'idle',
  resetPasswordSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetSuccessPassword(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(isAuthenticated.pending, (state) => {
        state.loading = true;
      })
      .addCase(isAuthenticated.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(isAuthenticated.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = undefined;
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.success = false;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(validateResetToken.pending, (state) => {
        state.resetTokenStatus = 'checking';
      })
      .addCase(validateResetToken.fulfilled, (state) => {
        state.resetTokenStatus = 'valid';
      })
      .addCase(validateResetToken.rejected, (state) => {
        state.resetTokenStatus = 'invalid';
      })
      .addCase(resetForgottenPassword.pending, (state) => {
        state.loading = true;
        state.resetPasswordSuccess = false;
        state.error = undefined;
      })
      .addCase(resetForgottenPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetForgottenPassword.rejected, (state, action) => {
        state.loading = false;
        state.resetPasswordSuccess = false;
        state.error = action.error.message
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = undefined;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
export const { resetSuccessPassword } = authSlice.actions;
