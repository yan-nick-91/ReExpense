export interface GoalResponseDTO {
  id?: string;
  savingId: string;
  title: string;
  description: string;
  targetAmount: number;
  createdAt?: string;
  updatedAt?: string | null;
}
