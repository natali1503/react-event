import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api/index'
import { IUser } from '../types/IUser'

// Define a type for the slice state
interface CounterState {
  isAuthenticated: boolean
  isAuthPending: boolean
  isGetCurentUserPending: boolean
  isDesignedError: boolean
  currentUser: IUser | null
}

// Define the initial state using that type
const initialState: CounterState = {
  isAuthenticated: false,
  isAuthPending: false,
  isGetCurentUserPending: false,
  isDesignedError: false,
  currentUser: null,
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    initializeAuth: (state) => {
      state.isAuthenticated = true
    },
    logOut: (state) => {
      localStorage.removeItem('token')
      state.isAuthenticated = false
      state.isAuthPending = false
      state.currentUser = null
      state.isGetCurentUserPending = false
    },

    requestUnsuccessfullByDesign: (state) => {
      state.isGetCurentUserPending = false
      state.isDesignedError = true
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
        state.isAuthPending = true
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuthPending = false
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthPending = false
        state.isAuthenticated = false
      })

      .addCase(getCurrentUser.pending, (state) => {
        state.isGetCurentUserPending = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.isAuthenticated = true
        state.isGetCurentUserPending = false
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isGetCurentUserPending = false
        // state.isAuthenticated = false
      })
  },
})

export const { initializeAuth, logOut, requestUnsuccessfullByDesign } =
  authorizationSlice.actions

export default authorizationSlice.reducer

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
    const res = await api.login(login, password)
    if (res.auth) {
      localStorage.setItem('token', res.token) // Сохраняем токен в localStorage
    } else {
      throw new Error('Login failed')
    }
  } catch {
    return rejectWithValue('Login failed')
  }
})

export const getCurrentUser = createAsyncThunk(
  '/api/user',
  async (_, thunkApi) => {
    try {
      //const token = localStorage.getItem('token') ?? ''
      return await api.getUser()
    } catch (error) {
      console.log('Error in thunk:', error)
      return thunkApi.rejectWithValue(error)
    }
  }
)
