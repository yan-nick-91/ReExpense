import { validateResetToken } from './../api/authHttpHandler';
import type { AppDispatch } from '../store/store';
import {
  register,
  login,
  logout,
  updatePassword,
  forgotPassword,
  resetForgottenPassword,
} from '../api/authHttpHandler';

export const registerController = (
  dispatch: AppDispatch,
  data: { email: string; password: string },
) => {
  dispatch(register(data)).unwrap();
};

export const loginController = (
  dispatch: AppDispatch,
  data: { email: string; password: string },
) => {
  dispatch(login(data)).unwrap();
};

export const updatePasswordController = (
  dispatch: AppDispatch,
  data: { currentPassword: string; newPassword: string },
) => {
  dispatch(updatePassword(data)).unwrap();
};

export const forgotPasswordController = (
  dispatch: AppDispatch,
  data: { email: string },
) => {
  dispatch(forgotPassword(data));
};

export const validateResetTokenController = (
  dispatch: AppDispatch,
  data: { token: string },
) => {
  dispatch(validateResetToken(data));
};

export const resetForgottenPasswordController = (
  dispatch: AppDispatch,
  data: { token: string, newPassword: string },
) => {
  dispatch(resetForgottenPassword(data));
};

export const logoutController = (dispatch: AppDispatch) => {
  dispatch(logout()).unwrap();
};
