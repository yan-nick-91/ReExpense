import type { AppDispatch } from '../store/store';
import {
  register,
  login,
  logout,
  updatePassword,
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

export const logoutController = (dispatch: AppDispatch) => {
  dispatch(logout()).unwrap();
};
