import { getAllTransaction } from './../api/transactionHttpHandler';
import { createTransaction } from '../api/transactionHttpHandler';
import type { AppDispatch } from '../store/store';
import type { TransactionType } from '../types/transactionTypes';

export const createTransactionController = async (
  dispatch: AppDispatch,
  data: { currency: number; category: string; type: TransactionType },
) => {
  dispatch(createTransaction(data)).unwrap();
};

export const getAllTransactionController = async (dispatch: AppDispatch) => {
  dispatch(getAllTransaction()).unwrap()
}