import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/IUser";
import { api } from "../api";

export const getUser = createAsyncThunk("profile/user", async () => {
  const response = await fetch(`https://natticharity.eveloth.ru/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    // body: JSON.stringify(data),
  });
  console.log(response.json());
  return response.json();
});

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    isData: false,
    data: <IUser>{},
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        console.log(124563);
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(123);
        console.log(action.payload);
        // state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        console.log(23423);
        state.error = String(action.error.message);
      });
  },
});

export default profileSlice.reducer;
