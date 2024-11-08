import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../types/IUser';
import { api } from '../api';

export const getUserFavourites = createAsyncThunk(
  'user/favourites',
  async () => {
    console.log(123);
    const response = await api.getUserFavourites();
    console.log(response);
    return response;
  }
);

export const userFavouritesSlice = createSlice({
  name: 'userFavourites',
  initialState: {
    loading: false,
    isData: false,
    data: [],
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserFavourites.pending, (state) => {
        // state.data = <IUser>{};
        state.isData = false;
        state.loading = true;
        state.error = '';
      })
      .addCase(getUserFavourites.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        state.isData = true;
      })
      .addCase(getUserFavourites.rejected, (state, action) => {
        state.isData = false;
        // state.data = <IUser>{};
        state.loading = false;
        state.error = String(action.error.message);
      });
  },
});

export default userFavouritesSlice.reducer;
