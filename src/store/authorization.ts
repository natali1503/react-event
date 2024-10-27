import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api/index';
import { IUser } from '../types/IUser';
import { IAuth } from '../types/IAuth';
import { IError } from '../types/IError';

// Define a type for the slice state
interface CounterState {
  isAuthenticated: boolean;
  isAuthPending: boolean;
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
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuthPending = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthPending = false;
        state.isAuthenticated = false;
        state.loginError = action.payload.loginError;
        state.invalidCredentials = action.payload.invalidCredentials; // Устанавливаем ошибку из rejectWithValue
      });

    // .addCase(getCurrentUser.pending, (state) => {
    //   state.isGetCurentUserPending = true;
    // })
    // .addCase(getCurrentUser.fulfilled, (state, action) => {
    //   state.currentUser = action.payload;
    //   state.isAuthenticated = true;
    //   state.isGetCurentUserPending = false;
    // })
    // .addCase(getCurrentUser.rejected, (state) => {
    //   state.isGetCurentUserPending = false;
    //   // state.isAuthenticated = false
    // });
  },
});

export const { initializeAuth, logOut, requestUnsuccessfullByDesign } =
  authorizationSlice.actions;

export default authorizationSlice.reducer;

// Async thunk
// export const fetchUsers = createAsyncThunk(
//   'getUsersAction', //string for the action type prefix
//   async () => {
//     return await api.getAllUsers()
//   }
// )

export const loginUser = createAsyncThunk<
  void,
  { login: string; password: string }
>('loginUser', async ({ login, password }, thunkAPI) => {
  try {
    const res: IAuth | IError = await api.login(login, password);
    // debugger;
    if (res.auth) {
      // debugger;
      console.log(123);
      localStorage.setItem('token', res.token); // Сохраняем токен в localStorage
    }
    if (res.codeError === 400) {
      // debugger;
      return thunkAPI.rejectWithValue({
        invalidCredentials: true,
        loginError: true,
      }); // Неверный пароль
    } else if (res.codeError === 500) {
      // debugger;
      return thunkAPI.rejectWithValue({
        invalidCredentials: false,
        loginError: true,
      }); // Общая ошибка сервера
    }
  } catch (e) {
    return thunkAPI.rejectWithValue('Login failed');
  }
});
