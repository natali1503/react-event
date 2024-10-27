import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api/index';
import { IUser } from '../types/IUser';
import { IAuth } from '../types/IAuth';
import { IError } from '../types/IError';

// Define a type for the slice state
interface CounterState {
  isAuthenticated: boolean;
  isAuthPending: boolean;
  user: string;
  errorMessage: string | null; // Добавляем поле для хранения сообщения об ошибке
  isGetCurentUserPending: boolean;
  isDesignedError: boolean;
  currentUser: IUser | null;
  loginError: boolean;
  invalidCredentials: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  isAuthenticated: false,
  isAuthPending: false,
  user: '',
  errorMessage: null, // Изначально ошибка отсутствует
  isGetCurentUserPending: false,
  isDesignedError: false,
  currentUser: null,
  loginError: false,
  invalidCredentials: false,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    initializeAuth: (state) => {
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.errorMessage = null; // Сбрасываем сообщение об ошибке при выходе
      state.isAuthPending = false;
      state.currentUser = null;
      state.isGetCurentUserPending = false;
    },

    requestUnsuccessfullByDesign: (state) => {
      state.isGetCurentUserPending = false;
      state.isDesignedError = true;
    },
    requestSuccessfull: (state) => {
      state.isDesignedError = false;
      state.isGetCurentUserPending = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.isAuthPending = true;
        state.errorMessage = null; // Сбрасываем сообщение об ошибке при новом запросе
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuthPending = false;
        state.isAuthenticated = true;
        state.errorMessage = null; // Сбрасываем сообщение об ошибке при успешной аутентификации
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthPending = false;
        state.isAuthenticated = false;
        // @ts-expect-error наладить типизацию экшена, согласовать с запросом
        state.loginError = action.payload.loginError;
        // @ts-expect-error наладить типизацию экшена, согласовать с запросом
        state.invalidCredentials = action.payload.invalidCredentials; // Устанавливаем ошибку из rejectWithValue
      });
  },
});

export const { initializeAuth, logOut, requestUnsuccessfullByDesign } =
  authorizationSlice.actions;

export default authorizationSlice.reducer;

export const loginUser = createAsyncThunk<
  void,
  { login: string; password: string }
>('loginUser', async ({ login, password }, thunkAPI) => {
  try {
    const res: IAuth | IError = await api.login(login, password);
    // debugger;
    // @ts-expect-error наладить типизацию экшена, согласовать с запросом
    if (res.auth) {
      // @ts-expect-error наладить типизацию экшена, согласовать с запросом
      localStorage.setItem('token', res.token); // Сохраняем токен в localStorage
    }
    // @ts-expect-error наладить типизацию экшена, согласовать с запросом
    if (res.codeError === 400) {
      // debugger;
      return thunkAPI.rejectWithValue({
        invalidCredentials: true,
        loginError: true,
      }); // Неверный пароль
      // @ts-expect-error наладить типизацию экшена, согласовать с запросом
    } else if (res.codeError === 500) {
      // debugger;
      return thunkAPI.rejectWithValue({
        invalidCredentials: false,
        loginError: true,
      }); // Общая ошибка сервера
    }
  } catch {
    return thunkAPI.rejectWithValue('Login failed');
    //return rejectWithValue("Login failed");
  }
});
