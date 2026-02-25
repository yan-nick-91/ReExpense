export type User = {
  id: string;
  email: string;
  password: string;
}

export type AuthState = {
  user?: SafeUser;
  isAuthenticated: boolean;
  error?: string;
  loading: boolean;
  success: boolean;
  resetTokenStatus: 'idle' | 'checking' | 'valid' | 'invalid',
  resetPasswordSuccess: boolean
}

export type SafeUser = Omit<User, 'password'>;
