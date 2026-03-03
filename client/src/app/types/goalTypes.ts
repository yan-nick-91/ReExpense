export type CreatedGoal = {
  title: string;
  description: string;
  price: number;
};

export type UpdatedGoal = {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  updatedAt: string;
};

export type GoalGeneral = {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt?: string;
};
