// store/refreshSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface RefreshState {
  appointments: boolean;
}

const initialState: RefreshState = {
  appointments: false,
};

const refreshSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    triggerAppointmentsRefresh: (state) => {
      state.appointments = !state.appointments; // переключаем значение
    },
    resetAppointmentsRefresh: (state) => {
      state.appointments = false;
    },
  },
});

export const { triggerAppointmentsRefresh, resetAppointmentsRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;