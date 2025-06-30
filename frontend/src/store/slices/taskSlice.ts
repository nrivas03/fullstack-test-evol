// src/store/slices/taskSlice.ts
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../../types';
import { getTasks, toggleTaskCompleted } from '../../services/taskService';
import { api } from '../../services';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<Task[], Record<string, string | boolean> | void>(
  'tasks/fetch',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const safeFilters = filters ?? {};
      const stringFilters = Object.fromEntries(
        Object.entries(safeFilters).map(([key, value]) => [key, String(value)])
      );
      const queryString = new URLSearchParams(stringFilters).toString();
      const data = await getTasks(queryString);
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al cargar tareas';
      return rejectWithValue(message);
    }
  }
);

export const toggleTask = createAsyncThunk<Task, number>(
  'tasks/toggle',
  async (id, { rejectWithValue }) => {
    try {
      const updatedTask = await toggleTaskCompleted(id);
      return updatedTask;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al actualizar tarea';
      return rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, updates }: { id: number; updates: Partial<Task> }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, updates);
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al actualizar tarea';
      return rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al eliminar tarea';
      return rejectWithValue(message);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // toggleTask
      .addCase(toggleTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(toggleTask.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
