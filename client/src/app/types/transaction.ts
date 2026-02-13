export type TransactionType = 'income' | 'outcome';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: string;
}
