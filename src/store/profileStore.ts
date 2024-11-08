import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProfileData } from '../types/IUser';
import { api } from '../api';
import { setFavourites } from './userFavourites';

export const getUser = createAsyncThunk<IProfileData>(
  'profile/user',
  async (_, { dispatch }) => {
    const response = await api.getUser();

    const { favouriteRequests, ...profileData } = response;
    dispatch(setFavourites(favouriteRequests));

    return profileData;
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: false,
    isData: false,
    data: <IProfileData>{},
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.data = <IProfileData>{};
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
        state.data = <IProfileData>{};
        state.loading = false;
        state.error = String(action.error.message);
      });
  },
});

export default profileSlice.reducer;
