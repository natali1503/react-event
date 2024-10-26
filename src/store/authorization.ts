import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api/index'

// Define a type for the slice state
interface CounterState {
  isAuthenticated: boolean
  isAuthPending: boolean
  user: string
}

// Define the initial state using that type
const initialState: CounterState = {
  isAuthenticated: false,
  isAuthPending: false,
  user: '',
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
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
  },
})

//export const { increment, decrement, getUsers } = authorizationSlice.actions

export default authorizationSlice.reducer

// Async thunk
export const fetchUsers = createAsyncThunk(
  'getUsersAction', //string for the action type prefix
  async () => {
    return await api.getAllUsers()
  }
)

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
