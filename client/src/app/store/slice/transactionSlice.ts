import { createSlice } from '@reduxjs/toolkit';
import type { Transaction } from '../../types/transactionTypes';
import {
  createTransaction,
  getAllTransaction,
} from '../../api/transactionHttpHandler';

type TransactionState = {
  items: Transaction[];
  loading: boolean;
  error: string | undefined;
  success: boolean;
};

const initialState: TransactionState = {
  items: [],
  loading: false,
  error: undefined,
  success: false,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetSuccessCreate(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
        state.success = true;
      })
      .addCase(createTransaction.rejected, (state) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(getAllTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTransaction.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getAllTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
