export type TransactionType = 'income' | 'outcome';

export interface Transaction {
  id: string;
  userId: string;
  currency: number;
  category: string;
  type: TransactionType;
  date: string;
}

export interface CreateTransactionPayload {
  currency: number;
  category: string;
  type: TransactionType;
}
