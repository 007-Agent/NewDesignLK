import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Импортируем редюсер
import textReducer from './InfoTitle';

const store = configureStore({
  reducer: {
    auth: authReducer,
    text: textReducer,
    
  },
  
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;