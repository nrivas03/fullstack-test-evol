import type { Task } from '../types';
import { api } from './api';

export const getTasks = async (query = ''): Promise<Task[]> => {
  const { data } = await api.get(`/tasks${query ? '?' + query : ''}`);
  return data;
};

export const toggleTaskCompleted = async (id: number) => {
  const { data } = await api.patch(`/tasks/toggle/${id}`);
  return data;
};

export const updateTask = async (
  id: number,
  updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>,
): Promise<Task> => {
  const { data } = await api.put(`/tasks/${id}`, updates);
  return data;
}

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
}
