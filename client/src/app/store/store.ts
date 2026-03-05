import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import transactionReducer from './slice/transactionSlice';
import goalReducer from './slice/goalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    goal: goalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
