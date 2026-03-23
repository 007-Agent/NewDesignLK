import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // ваш инстанс axios или fetch


interface SpecialtiesState {
  items: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}



export const fetchSpecialties = createAsyncThunk(
  'specialties/fetchSpecialties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/sched/spec');
      return response.data.data; // ожидаем массив специальностей
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
      
    }
  }
);

const initialState: SpecialtiesState = {
  items: [],
  status: 'idle',
  error: null,
};

const specialtiesSlice = createSlice({
  name: 'specialties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialties.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSpecialties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSpecialties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default specialtiesSlice.reducer;