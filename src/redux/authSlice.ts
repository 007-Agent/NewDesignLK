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
export const checkAuth  = createAsyncThunk('auth/check', async () => {
  const response = await axios.get('/api/login/check');
  return response.data.data;
  
})

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
 initialState: {
    user: null,
    status: 'idle',
    checkStatus: 'idle',
    logoutStatus: 'idle',
    error: null,
    menuOpen: false,
  } as AuthState,
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
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Ошибка входа';
      })
      .addCase(checkAuth.pending, (state) => {
        state.checkStatus = 'loading';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.checkStatus = 'succeeded';
        state.user = action.payload; // Устанавливаем пользователя при успешной проверке
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.checkStatus = 'failed';
        state.error = action.payload as string || 'Ошибка проверки';
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutStatus = 'loading'; // Устанавливаем статус в loading
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutStatus = 'succeeded'; // Устанавливаем статус в succeeded
        state.user = null; // Сбрасываем пользователя
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

