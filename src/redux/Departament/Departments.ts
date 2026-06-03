import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Тип для отдела (department)
export interface Branch {
  id: number;
  name: string;
}

// Тип для отдела
export interface Department {
  id: number;
  name: string;
  branch: Branch;
}

interface DepartmentsState {
  items: Department[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DepartmentsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Асинхронный thunk для получения списка отделов
export const fetchDepartments = createAsyncThunk<Department[]>(
  'departments/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/sched/dep');
      return response.data.data; // предполагаем, что данные в response.data.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка загрузки отделов';
      return rejectWithValue(errorMessage);
    }
  }
);

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default departmentsSlice.reducer;