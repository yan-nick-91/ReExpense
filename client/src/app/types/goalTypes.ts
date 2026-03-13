export type Goal = {
  title: string;
  description: string;
  targetAmount: number;
};

export type UpdateGoal = Goal & {
  id: string
}

export type GoalGeneral = Goal & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
};
