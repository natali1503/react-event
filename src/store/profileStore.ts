import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/IUser";
import { api } from "../api";

export const getUser = createAsyncThunk<IUser>("profile/user", async () => {
  const response = await api.getUser();
  return response;
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
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isData = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.error.message);
      });
  },
});

export default profileSlice.reducer;
