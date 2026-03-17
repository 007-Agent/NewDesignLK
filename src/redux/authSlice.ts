import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginCredentials {
  username: string;
  password: string;
}
export interface Usernow {
id: number;
uuid: string;
firstName: string;
lastName: string;
middleName: string;
birthday: string;
email: string;
phone: string;
username: string | null;
name: string | null;
polId: number;
stateId: number;
authorities: string[];
captcha: any;
agreed: number;
}
interface AuthState {
  user: Usernow | null;

  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  checkStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  logoutStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  menuOpen: boolean
}

export const loginUser = createAsyncThunk<
  Usernow,               
  LoginCredentials,     
  { rejectValue: string } 
>(
  'auth/login',
  async ({ username, password }: LoginCredentials, { rejectWithValue }) => {
    const url = '/api/login' +
      '?username=' +
      encodeURIComponent(username) +
      '&password=' +
      encodeURIComponent(password);
    
  try {
      const response = await axios.post(url);
          console.log(response.data.data)
      return response.data.data as Usernow;
  
    } catch (error: any) {
      // Явно указываем тип для error
      const errorMessage = error.response?.data?.message || 'Ошибка входа';
      return rejectWithValue(errorMessage);
    }
  }
);

const savedUser = localStorage.getItem('user');
const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  status: 'idle',
  checkStatus: 'idle',
  logoutStatus: 'idle',
  error: null,
  menuOpen: false,
};


export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/logout'); // Выполняем POST запрос для выхода
      return response.data; // Если данные возвращаются, их можно вернуть
    } catch (error: any) {
     const errorMessage = error.response?.data?.message || 'Ошибка входа';
     return rejectWithValue(errorMessage);
   }
  }
);

const authSlice = createSlice({
  name: 'auth',
 initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token'); 
    },
     setMenuOpen: (state, action) => {
      state.menuOpen = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Ошибка входа';
      })
      
      .addCase(logoutUser.pending, (state) => {
        state.logoutStatus = 'loading'; // Устанавливаем статус в loading
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutStatus = 'succeeded'; // Устанавливаем статус в succeeded
        state.user = null; // Сбрасываем пользователя
        localStorage.removeItem('user');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutStatus = 'failed'; // Устанавливаем статус в failed
         state.error = action.payload as string; // Сохраняем сообщение об ошибке
      });
  },
});

// Экспортируем действия и редюсер
export const { logout, setMenuOpen  } = authSlice.actions;
export default authSlice.reducer;

