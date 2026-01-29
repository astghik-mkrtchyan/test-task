export interface Task {
  id?: number;
  title: string;
  status: 'pending' | 'in_progress' | 'done';
  createdAt?: string;
  updatedAt?: string;
}
