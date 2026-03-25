type TransactionType = 'income' | 'expense'

export interface CreateTransactionDTO {
      savingId: string;
      amount: number;
      category: string;
      type: TransactionType;
}