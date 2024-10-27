import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api/index';
import { IUser } from '../types/IUser';
import { IAuth } from '../types/IAuth';

// Define a type for the slice state
interface CounterState {
  isAuthenticated: boolean;
  isAuthPending: boolean;
<<<<<<< HEAD
  user: string;
  errorMessage: string | null; // Добавляем поле для хранения сообщения об ошибке
=======
  isGetCurentUserPending: boolean;
  isDesignedError: boolean;
  currentUser: IUser | null;
>>>>>>> upstream/main
}

// Define the initial state using that type
const initialState: CounterState = {
  isAuthenticated: false,
  isAuthPending: false,
<<<<<<< HEAD
  user: "",
  errorMessage: null, // Изначально ошибка отсутствует
=======
  isGetCurentUserPending: false,
  isDesignedError: false,
  currentUser: null,
>>>>>>> upstream/main
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
<<<<<<< HEAD
      state.errorMessage = null; // Сбрасываем сообщение об ошибке при выходе
=======
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
>>>>>>> upstream/main
    },
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // getUsers: (state, action: PayloadAction<User[]>) => {
    //   state.users = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchUsers.fulfilled, (state, action) => {
      //   state.users = action.payload
      //   state.pending = false
      // })
      // .addCase(fetchUsers.pending, (state) => {
      //   state.pending = true
      // })
      // .addCase(addUserById.fulfilled, (state, action) => {
      //   state.users.push(action.payload)
      //   state.pending = false
      // })
      // .addCase(addUserById.pending, (state) => {
      //   state.pending = true
      // })
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
        state.errorMessage = action.payload as string; // Сохраняем сообщение об ошибке
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
>('loginUser', async ({ login, password }, { rejectWithValue }) => {
  try {
    const res: IAuth = await api.login(login, password);
    if (res.auth) {
      console.log(123);
      localStorage.setItem('token', res.token); // Сохраняем токен в localStorage
    } else {
      throw new Error('Login failed');
    }
<<<<<<< HEAD
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
    //return rejectWithValue("Login failed");
=======
  } catch {
    return rejectWithValue('Login failed');
>>>>>>> upstream/main
  }
});
