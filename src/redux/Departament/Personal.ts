import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Тип для сотрудника (врача/персонала)
export interface Personal {
  id: number;
  name: string;
  branch: {
    id: number;
    name: string;
  };
  department: {
    id: number;
    name: string;
  };
}

interface PersonalState {
  items: Personal[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PersonalState = {
  items: [],
  status: 'idle',
  error: null,
};

// Асинхронный thunk для получения списка сотрудников (врачей)
export const fetchPersonal = createAsyncThunk<Personal[]>(
  'personal/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/sched/pers');
      return response.data.data; // предполагаем, что данные в response.data.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка загрузки сотрудников';
      return rejectWithValue(errorMessage);
    }
  }
);

const personalSlice = createSlice({
  name: 'personal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonal.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPersonal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPersonal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default personalSlice.reducer;