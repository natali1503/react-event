import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../types/IUser';
import { api } from '../api';
import { toast } from 'react-toastify';

export const getUser = createAsyncThunk<IUser>('profile/user', async () => {
  const response = await api.getUser();
  return response;
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: false,
    isData: false,
    data: <IUser>{},
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.data = <IUser>{};
        state.isData = false;
        state.loading = true;
        state.error = '';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isData = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isData = false;
        state.data = <IUser>{};
        state.loading = false;
        state.error = String(action.error.message);
      });
  },
});

export default profileSlice.reducer;
