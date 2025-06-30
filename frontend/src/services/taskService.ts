import type { Task } from '../types';
import { api } from './api';

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get('/tasks');
  return data;
};

export const toggleTaskCompleted = async (id: number) => {
  const { data } = await api.patch(`/tasks/toggle/${id}`);
  return data;
};
