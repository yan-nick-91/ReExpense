export type Goal = {
  title: string;
  description: string;
  price: number;
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
