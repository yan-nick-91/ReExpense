import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import savingReducer from './slice/savingSlice';
import transactionReducer from './slice/transactionSlice';
import goalReducer from './slice/goalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    saving: savingReducer,
    transaction: transactionReducer,
    goal: goalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
