import { createSlice } from '@reduxjs/toolkit';
import type { Saving } from '../../types/savingType';
import { getAllSavingBalances, requestSpecificSavingBySavingId } from '../../api/savingHttpHandler';

type SavingState = {
  items: Saving[];
  item: Saving | undefined
  loading: boolean;
  error: string | undefined;
  success: boolean;
};

const initialState: SavingState = {
  items: [],
  item: undefined,
  loading: false,
  error: undefined,
  success: false,
};

const savingSlice = createSlice({
  name: 'savings',
  initialState,
  reducers: {
    clearSavings: (state) => {
      state.items = [];
      state.success = false;
      state.error = undefined
      state.loading = false
    }
  },
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
      })
      .addCase(requestSpecificSavingBySavingId.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = undefined
        state.item = undefined
      })
      .addCase(requestSpecificSavingBySavingId.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.item = action.payload
      }).addCase(requestSpecificSavingBySavingId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      });
  },
});

export const { clearSavings } = savingSlice.actions;
export default savingSlice.reducer
