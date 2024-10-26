import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api/index";

export interface User {
  id: number;
  name: string;
  surname: string;
}

// Define a type for the slice state
interface CounterState {
  users: User[];
  value: number;
  pending: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  users: [],
  value: 0,
  pending: false,
};

export const rtkSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    getUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.pending = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.pending = true;
      })
      .addCase(addUserById.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.pending = false;
      })
      .addCase(addUserById.pending, (state) => {
        state.pending = true;
      });
  },
});

export const { increment, decrement, getUsers } = rtkSlice.actions;

export default rtkSlice.reducer;

// Async thunk
export const fetchUsers = createAsyncThunk(
  "getUsersAction", //string for the action type prefix
  async () => {
    return await api.getAllUsers();
  }
);

export const addUserById = createAsyncThunk(
  "getUserById",
  async (userId: number) => {
    return await api.getUserById(userId);
  }
);
