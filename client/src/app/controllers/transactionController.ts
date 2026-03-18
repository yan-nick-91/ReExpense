import { getAllTransaction } from './../api/transactionHttpHandler';
import { createTransaction } from '../api/transactionHttpHandler';
import type { AppDispatch } from '../store/store';
import type { TransactionType } from '../types/transactionTypes';
import { getAllSavingBalances } from '../api/savingHttpHandler';

export const createTransactionController = async (
  dispatch: AppDispatch,
  data: { amount: number; category: string; type: TransactionType },
) => {
  await dispatch(createTransaction(data)).unwrap();

  await dispatch(getAllSavingBalances()).unwrap();
};

export const getAllTransactionController = async (dispatch: AppDispatch) => {
  dispatch(getAllTransaction()).unwrap()
}