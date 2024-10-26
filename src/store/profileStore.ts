import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/IUser";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    token: "",
    data: <IUser>{},
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        console.log(action.payload.token);
      })
      .addCase(authUser.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.error.message);
      });
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.error.message);
      });
  },
});

export default profileSlice.reducer;

const url = "http://localhost:4040/api/";

export const authUser = createAsyncThunk("profile/authUser", async () => {
  const data = {
    login: "testUser16@test.com",
    password: "password16",
  };
  const response = await fetch(`${url}auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

export const getUser = createAsyncThunk("profile", async (token: string) => {
  const response = await fetch(`${url}user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
});
