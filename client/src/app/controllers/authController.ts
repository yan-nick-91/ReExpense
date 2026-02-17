import type { AppDispatch } from '../store/store';
import { register, login, logout, updatePassword } from '../api/authHttpHandler';

export const registerController = async (
  dispatch: AppDispatch,
  data: { email: string; password: string },
) => {
  dispatch(register(data)).unwrap();
};

export const loginController = async (
  dispatch: AppDispatch,
  data: { email: string; password: string },
) => {
  dispatch(login(data)).unwrap();
};

export const updatePasswordController = async (
  dispatch: AppDispatch,
  data: { currentPassword: string, newPassword: string}
) => {
  dispatch(updatePassword(data)).unwrap()
}

export const logoutController = async (
  dispatch: AppDispatch
) => {
  dispatch(logout()).unwrap()
}
