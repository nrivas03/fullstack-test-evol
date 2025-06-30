import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import * as services from './';
import { api } from './api';

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
    patch: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getTasks hace GET con query y retorna data', async () => {
    const mockData = [{ id: 1, title: 'Test task' }];
    (api.get as Mock).mockResolvedValue({ data: mockData });

    const result = await services.getTasks('status=done');

    expect(api.get).toHaveBeenCalledWith('/tasks?status=done');
    expect(result).toEqual(mockData);
  });

  it('getTasks sin query funciona', async () => {
    const mockData = [{ id: 2, title: 'Otra tarea' }];
    (api.get as Mock).mockResolvedValue({ data: mockData });

    const result = await services.getTasks();

    expect(api.get).toHaveBeenCalledWith('/tasks');
    expect(result).toEqual(mockData);
  });

  it('toggleTaskCompleted hace PATCH y retorna data', async () => {
    const mockResponse = { success: true };
    (api.patch as Mock).mockResolvedValue({ data: mockResponse });

    const result = await services.toggleTaskCompleted(123);

    expect(api.patch).toHaveBeenCalledWith('/tasks/toggle/123');
    expect(result).toEqual(mockResponse);
  });

  it('updateTask hace PUT con updates y retorna data', async () => {
    const updates = { title: 'Nuevo título' };
    const mockUpdatedTask = { id: 10, title: 'Nuevo título' };
    (api.put as Mock).mockResolvedValue({ data: mockUpdatedTask });

    const result = await services.updateTask(10, updates);

    expect(api.put).toHaveBeenCalledWith('/tasks/10', updates);
    expect(result).toEqual(mockUpdatedTask);
  });

  it('deleteTask hace DELETE', async () => {
    (api.delete as Mock).mockResolvedValue({});

    await services.deleteTask(5);

    expect(api.delete).toHaveBeenCalledWith('/tasks/5');
  });
});
