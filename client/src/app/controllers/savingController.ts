import {
  getAllSavingBalances,
  requestSpecificSavingBySavingId,
} from '../api/savingHttpHandler';
import type { AppDispatch } from '../store/store';

export const getAllSavingBalanceController = async (dispatch: AppDispatch) => {
  await dispatch(getAllSavingBalances()).unwrap();
};

export const getSavingByIdController = async (
  dispatch: AppDispatch,
  savingId: string,
) => {
  await dispatch(requestSpecificSavingBySavingId(savingId)).unwrap();
};
