import { createAsyncThunk } from '@reduxjs/toolkit';
//import { api } from '../api';
import api from '../services/api';
import { HelpRequest } from '../types/HelpRequest';
import { IProfileData, IUser } from '../types/IUser';
import { setFavourites } from './user-favourites/userFavourites';
import { IError } from '../types/IError';
import { showSuccessToast } from '../components/Toasts/showToasts';
import { toast } from 'react-toastify';
import { APIRoute } from '../const/const';
import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from './types';


//const MAX_RETRIES = 5;

export const fetchHelpRequestsAction = createAsyncThunk<HelpRequest[], void, { rejectValue: IError }>(
  'helpRequests/fetchHelpRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(APIRoute.HelpRequests);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ codeError: 500, message: error.message });
    }
  }
);


export const fetchContributeToRequest = createAsyncThunk<
  string, // Тип возвращаемого значения
  { id: string }, // Аргументы, передаваемые в thunk
  { rejectValue: IError } // Тип ошибок
>(
  'helpRequests/contributeToRequest',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${APIRoute.HelpRequests}/${id}/contribution`);
      return response.data; // Возвращаем строку с данными
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      return rejectWithValue({ codeError: error.response?.status || 500, message: errorMessage });
    }
  }
);

export const getUserAction = createAsyncThunk<IProfileData, void, { rejectValue: IError }>(
  'profile/user',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(APIRoute.User);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ codeError: 500, message: error.message });
    }
  }
);

/*
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
*/

export const addToFavouritesAction = createAsyncThunk<string, string, { rejectValue: IError }>(
  'favourites/addToFavourites',
  async (favouriteId, { rejectWithValue }) => {
    try {
      const response = await api.post(APIRoute.FavouritesHelpRequests, {
        requestId: favouriteId,
      });
      return favouriteId;  // возращаем ID, если успешно добавили
    } catch (error: any) {
      return rejectWithValue({ codeError: 500, message: error.message });
    }
  }
);

export const removeFromFavouritesAction = createAsyncThunk<string, string, { rejectValue: IError }>(
  'favourites/removeFromFavourites',
  async (favouriteId, { rejectWithValue }) => {
    try {
      await api.delete(`${APIRoute.FavouritesHelpRequests}/${favouriteId}`);
      return favouriteId;  // возращаем ID, если успешно удалили
    } catch (error: any) {
      return rejectWithValue({ codeError: 500, message: error.message });
    }
  }
);

export const fetchRequestAction = createAsyncThunk<HelpRequest, string, { rejectValue: IError }>(
  'helpRequests/fetchRequestAction',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${APIRoute.HelpRequests}/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ codeError: 500, message: error.message });
    }
  }
);



/*

export const login = createAsyncThunk<IUser,
  { login: string; password: string },
  { rejectValue: IError }
>('auth/login', async ({ login, password }, { rejectWithValue }) => {
  try {
    const response = await api.post<IUser>(APIRoute.Login, { login, password });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data || 'Ошибка при входе';
    return rejectWithValue({
      codeError: error.response?.status || 500,
      message: errorMessage,
    });
  }
});


export const fetchUser = createAsyncThunk<IUser, void, { rejectValue: IError }>(
  'profile/user',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<IUser>(APIRoute.User);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data || 'Ошибка при загрузке пользователя';
      return rejectWithValue({
        codeError: error.response?.status || 500,
        message: errorMessage,
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
);*/