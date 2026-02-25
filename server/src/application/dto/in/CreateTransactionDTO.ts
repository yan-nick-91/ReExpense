type TransactionType = 'income' | 'expense'

export interface CreateTransactionDTO {
      amount: number;
      category: string;
      type: TransactionType;
}