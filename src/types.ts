export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type Filter = 'all' | 'pending' | 'completed';