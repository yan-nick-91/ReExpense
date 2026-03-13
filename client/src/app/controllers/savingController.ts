import { getAllSavingBalances } from '../api/savingHttpHandler';
import type { AppDispatch } from '../store/store';

export const getAllSavingBalanceController = async (dispatch: AppDispatch) => {
  await dispatch(getAllSavingBalances()).unwrap();
};
