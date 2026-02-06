import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  textInfo: [],
  doctorInfo: "",
  doctor: ""
  
};

const InfoTitle = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setText(state, action) {
        state.textInfo = action.payload; // Обновляем состояние
      },
    setDoctor(state, action) {
      state.doctorInfo = action.payload;
    },
    setNameDoctor(state, action) {
      state.doctor = action.payload;
    }
  },
});

export const { setText, setDoctor, setNameDoctor } = InfoTitle.actions;

export default InfoTitle.reducer;