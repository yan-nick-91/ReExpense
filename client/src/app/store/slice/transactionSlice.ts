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
};

const initialState: TransactionState = {
  items: [],
  loading: false,
  error: undefined,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(createTransaction.rejected, (state) => {
        state.loading = false;
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
