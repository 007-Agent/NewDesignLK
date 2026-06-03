import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Тип для филиала (branch)
export interface Branch {
    address: string;
  id: number;
  name: string;
  // другие поля, если есть
}

interface BranchesState {
  items: Branch[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BranchesState = {
  items: [],
  status: 'idle',
  error: null,
};

// Асинхронный thunk для получения списка филиалов
export const fetchBranches = createAsyncThunk<Branch[]>(
  'branches/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/sched/branch');
      return response.data.data; // предполагаем, что данные в response.data.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка загрузки филиалов';
      return rejectWithValue(errorMessage);
    }
  }
);

const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default branchesSlice.reducer;