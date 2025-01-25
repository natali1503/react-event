import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api/index';
import { IAuth } from '../types/IAuth';
import { IError } from '../types/IError';
import { loginAction } from './api-actions';
import { dropToken } from '../services/token';

// Define a type for the slice state
interface CounterState {
  isAuthenticated: boolean;
  isAuthPending: boolean;
  errorMessage: string | null; // Добавляем поле для хранения сообщения об ошибке
}

// Define the initial state using that type
const initialState: CounterState = {
  isAuthenticated: !!localStorage.getItem('token'),
  isAuthPending: false,
  errorMessage: null, // Изначально ошибка отсутствует
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuthorized: (state) => {
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      dropToken();
      state.isAuthenticated = false;
      state.errorMessage = null; // Сбрасываем сообщение об ошибке при выходе
      state.isAuthPending = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginAction.pending, (state) => {
        state.isAuthPending = true;
        state.errorMessage = null; // Сбрасываем сообщение об ошибке при новом запросе
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.isAuthPending = false;
        state.isAuthenticated = true;
        state.errorMessage = null; // Сбрасываем сообщение об ошибке при успешной аутентификации
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isAuthPending = false;
        state.isAuthenticated = false;
        state.errorMessage = String(action.payload);
      });
  },
});

export const { setAuthorized, logOut } = authorizationSlice.actions;

export default authorizationSlice.reducer;

/*export const loginUser = createAsyncThunk<
  void,
  { login: string; password: string }
>('loginUser', async ({ login, password }, thunkAPI) => {
  try {
    const res = await api.login<IAuth>(login, password);
    //debugger;
    if (res && (res as IError).codeError === 400) {
      //debugger;
      // пробрасываем дальше, чтобы выставить правильный текст ошибки
      // либо неправильный логин пароль либо ошибка на сервере
      return thunkAPI.rejectWithValue('Неправильный логин или пароль');
    }

    if (res && (res as IError).codeError === 500) {
      //debugger;
      // пробрасываем дальше, чтобы выставить правильный текст ошибки
      // либо неправильный логин пароль либо ошибка на сервере
      return thunkAPI.rejectWithValue('Ошибка сервера, повторите позже');
    }

    if (res && 'token' in res) {
      //debugger;
      // если получили аутентификационные данные, все гуд
      localStorage.setItem('token', res.token);
      setAuthorized();
    }
  } catch (e) {
    //debugger;
    // если ошибка случилась еще где то, прокидываем ее дальше, тоже в миддлвар перехватчик
    return thunkAPI.rejectWithValue(e);
  }
});*/
