import { createSlice } from '@reduxjs/toolkit';
import type { Saving } from '../../types/savingType';
import { getAllSavingBalances } from '../../api/savingHttpHandler';

type SavingState = {
  items: Saving[];
  loading: boolean;
  error: string | undefined;
  success: boolean;
};

const initialState: SavingState = {
  items: [],
  loading: false,
  error: undefined,
  success: false,
};

const savingSlice = createSlice({
  name: 'savings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSavingBalances.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAllSavingBalances.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getAllSavingBalances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default savingSlice.reducer
