export interface GoalResponseDTO {
  id?: string;
  userId: string;
  title: string;
  description: string;
  targetAmount: number;
  createdAt?: string;
  updatedAt?: string;
}
