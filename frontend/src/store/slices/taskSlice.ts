import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toggleTaskCompleted } from '../../services/taskService';
import type { Task } from '../../types';
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

export const fetchTasks = createAsyncThunk(
  'tasks/fetch',
  async (filters: Record<string, string | boolean> = {}) => {
    const stringFilters: Record<string, string> = Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [key, String(value)])
    );
    const params = new URLSearchParams(stringFilters).toString();
    const response = await api.get(`/tasks?${params}`);
    return response.data;
  }
);
export const toggleTask = createAsyncThunk('tasks/toggleTask', toggleTaskCompleted);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.error = 'Error al cargar tareas';
        state.loading = false;
      });
  },
});

export default taskSlice.reducer;
