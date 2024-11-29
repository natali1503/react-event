import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { HelpRequest } from '../types/HelpRequest';
import { IProfileData } from '../types/IUser';
import { setFavourites } from './user-favourites/userFavourites';
import { IError } from '../types/IError';
import { showSuccessToast } from '../components/Toasts/showToasts';
import { toast } from 'react-toastify';

const MAX_RETRIES = 5;

export const fetchHelpRequestsAction = createAsyncThunk<HelpRequest[]>(
  'helpRequests/fetchHelpRequests',
  async () => {
    const response = await api.getHelpRequests();
    return response;
  }
);

export const fetchСontributeToRequest = createAsyncThunk<
  string,
  { id: string },
  { rejectValue: IError }
>(
  'helpRequests/contributeToRequest',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.contributeToRequest(id);

      if (typeof response === 'string') {
        return response;
      }

      return rejectWithValue(response as IError);
    } catch (error) {
      return rejectWithValue({
        codeError: 500,
        message: String(error),
      });
    }
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

export const getFavouritesAction = createAsyncThunk<string[], void, { rejectValue: string }>(
  'favourites/getFavouritesAction',
  async (_, { rejectWithValue }) => {
    let attempt = 1;

    while (attempt <= MAX_RETRIES) {
      try {
        const response = await api.getUserFavourites(); 
        if (Array.isArray(response) && response.length >= 0) {
          return response;
        }; 
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (attempt === MAX_RETRIES) {
            return rejectWithValue(error.message);
          }
          attempt++;
          await new Promise((resolve) => setTimeout(resolve, 500));
        } else {
          if (attempt === MAX_RETRIES) {
            return rejectWithValue('Unexpected error occurred');
          }
          attempt++;
          await new Promise((resolve) => setTimeout(resolve, 500));
        };
      };
    };
    return rejectWithValue('Max retries reached');
  }
);

export const addToFavouritesAction = createAsyncThunk<string, string, { rejectValue: string | IError }>(
  'favourites/addToFavourites',
  async (favouriteId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.addToFavourites(favouriteId); 

      if ((response as IError).message && (response as IError).codeError) {
        toast.error('Ошибка! Попробуйте еще раз')
        return rejectWithValue(response);
      }

      dispatch(getFavouritesAction());
      showSuccessToast('Успех! Добавлено в избранное');
      return favouriteId;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error adding to favourites:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromFavouritesAction = createAsyncThunk <string, string, { rejectValue: string | IError }>(
  'favourites/remove',
  async (favouriteId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.removeFromFavourites(favouriteId);

      if (!response) {
        return rejectWithValue('Failed to remove from favourites: No response returned');
      }

      if ((response as IError).message && (response as IError).codeError) {
        toast.error('Ошибка! Попробуйте еще раз')
        return rejectWithValue(response);
      }

      dispatch(getFavouritesAction());
      return favouriteId;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error removing from favourites:', error.message);
      return rejectWithValue('Unexpected error occurred while removing from favourites');
    }
  }
);

export const fetchRequestAction = createAsyncThunk<HelpRequest, string>(
  'helpRequests/fetchRequestAction',
  async (id) => {
    const response = await api.getHelpRequestInfo(id);
    return response;
  }
);