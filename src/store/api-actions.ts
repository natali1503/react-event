import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { HelpRequest } from '../types/HelpRequest';
import { IFavourite } from '../types/IFavourite';
import { IProfileData } from '../types/IUser';
import { setFavourites } from './userFavourites';

export const fetchHelpRequestsAction = createAsyncThunk<HelpRequest[]>(
  'helpRequests/fetchHelpRequests',
  async () => {
    const response = await api.getHelpRequests();
    return response;
  }
);

export const getUser = createAsyncThunk<IProfileData>(
  'profile/user',
  async (_, { dispatch }) => {
    const response = await api.getUser();

    const { favouriteRequests, ...profileData } = response;
    dispatch(setFavourites(favouriteRequests));

    return profileData;
  }
);

export const addToFavouritesAction = createAsyncThunk<IFavourite[], string, { rejectValue: string }>(
  'favourites/addToFavourites',
  async (favouriteId: string, { rejectWithValue }) => {
    try {
      const response = await api.addToFavourites(favouriteId); 

      if (!response) {
        throw new Error('Failed to add to favourites');
      }

      return response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error adding to favourites:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromFavouritesAction = createAsyncThunk(
  'favourites/remove',
  async (favouriteId: string, { rejectWithValue }) => {
    try {
      const response = await api.removeFromFavourites(favouriteId);

      if (response === null) {
        return 'Item successfully removed from favourites';
      }

      return rejectWithValue(response);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error removing from favourites:', error.message);
      return rejectWithValue('Unexpected error occurred while removing from favourites');
    }
  }
);