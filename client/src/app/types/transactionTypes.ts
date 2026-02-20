export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  userId: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: string;
}

export type CreateTransactionPayload = {
  amount: number;
  category: string;
  type: TransactionType;
}
