import type { AppDispatch } from '../store/store';
import { login, register } from '../api/authHttpHandler';

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
