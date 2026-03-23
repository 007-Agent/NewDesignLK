import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Импортируем редюсер
import textReducer from './InfoTitle';
import specialtiesReducer from './/Departament/Specialities';
const store = configureStore({
  reducer: {
    auth: authReducer,
    text: textReducer,
    specialities: specialtiesReducer, 
    
  },
  
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;