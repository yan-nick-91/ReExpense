type TransactionType = 'income' | 'expense'

export interface TransactionResponseDTO {
      id: string;
      userId: string;
      amount: number;
      category: string;
      type: TransactionType;
      date: string;
}