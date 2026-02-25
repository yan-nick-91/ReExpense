import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import transactionReducer from './slice/transactionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
