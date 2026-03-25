type TransactionType = 'income' | 'expense'

export interface TransactionResponseDTO {
      id: string;
      savingId: string;
      amount: number;
      category: string;
      type: TransactionType;
      date: string;
}