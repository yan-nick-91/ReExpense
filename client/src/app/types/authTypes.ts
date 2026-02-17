export interface User {
  id: string;
  email: string;
  password: string;
}

export interface AuthState {
  user?: SafeUser;
  isAuthenticated: boolean;
  error?: string;
  loading: boolean,
  success: boolean
}

export type SafeUser = Omit<User, 'password'>;
