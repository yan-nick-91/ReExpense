export type TransactionType = 'income' | 'outcome';

export type Transaction = {
  id: string;
  userId: string;
  currency: number;
  category: string;
  type: TransactionType;
  date: string;
}

export type CreateTransactionPayload = {
  currency: number;
  category: string;
  type: TransactionType;
}
