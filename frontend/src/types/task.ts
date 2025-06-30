export interface Tag {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  tags: Tag[];
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}
