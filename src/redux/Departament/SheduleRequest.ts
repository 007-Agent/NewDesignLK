import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Тип для элемента расписания (подставьте свои поля)
export interface ScheduleItem {
  id: number;
  date: string;
  time: string;
  doctorName: string;
  // ... другие поля
}

interface ScheduleState {
  items: ScheduleItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ScheduleState = {
  items: [],
  status: 'idle',
  error: null,
};

// Асинхронный thunk для запроса расписания
export const fetchSchedule = createAsyncThunk<
  ScheduleItem[],          // тип возвращаемых данных
  void,                    // тип аргумента (ничего не передаём)
  { rejectValue: string }
>(
  'schedule/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const date = new Date();
      const response = await axios.post('/api/sched/list', { date });
      // Предполагаем, что данные лежат в response.data.data
      return response.data.data as ScheduleItem[];
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Ошибка загрузки расписания';
      return rejectWithValue(errorMessage);
    }
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    // можно добавить синхронные действия при необходимости
    clearSchedule: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;