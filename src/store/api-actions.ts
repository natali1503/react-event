import { createAsyncThunk } from '@reduxjs/toolkit';
//import { api } from '../api';
import { saveToken } from '../services/token';
import { HelpRequest } from '../types/HelpRequest';
import { IProfileData, IUser } from '../types/IUser';
import { setFavourites } from './user-favourites/userFavourites';
import { setAuthorized } from './authorization';
import { IError } from '../types/IError';
import { APIRoute, AppRoute } from '../const/const';
import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from './types';
import { AuthData } from '../types/auth-data';
import { IAuth } from '../types/IAuth';
import { redirectToRoute } from './action';

//const MAX_RETRIES = 5;

export const fetchHelpRequestsAction = createAsyncThunk<HelpRequest[], void, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'helpRequests/fetchHelpRequests',
  async (_, {extra: api}) => {
    const response = await api.get(APIRoute.HelpRequests);
    return response.data;
  }
);

export const fetchContributeToRequest = createAsyncThunk<string, { id: string }, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
  'helpRequests/contributeToRequest',
  async ({ id }, {extra: api}) => {
    const response = await api.post(`${APIRoute.HelpRequests}/${id}/contribution`);
    return response.data;
  }
);

export const getUserAction = createAsyncThunk<IProfileData, void, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'profile/user',
  async (_, {dispatch, extra: api}) => {
    const response = await api.get(APIRoute.User);
    const { favouriteRequests } = response.data;
    dispatch(setFavourites(favouriteRequests));
    return response.data;
  }
);

// удалить 
export const getFavouritesAction = createAsyncThunk<string[], void, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'favourites/getFavouritesAction',
  async (_, {extra: api}) => {
    const response = await api.get(APIRoute.FavouritesHelpRequests);
    return response.data;
    //let attempt = 1;

    /*while (attempt <= 5) {
      try {
        const response = await api.post(APIRoute.FavouritesHelpRequests); 
        if (Array.isArray(response) && response.length >= 0) {
          return response;
        }; 
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (attempt === 5) {
            return ''; //rejectWithValue(error.message);
          }
          attempt++;
          await new Promise((resolve) => setTimeout(resolve, 500));
        } else {
          if (attempt === 5) {
            return ''; //rejectWithValue('Unexpected error occurred');
          }
          attempt++;
          await new Promise((resolve) => setTimeout(resolve, 500));
        };
      };
    };
    return ''; //rejectWithValue('Max retries reached');*/
  }
);


export const addToFavouritesAction = createAsyncThunk<string, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'favourites/addToFavourites',
  async (favouriteId, { extra: api }) => {
    const response = await api.post(APIRoute.FavouritesHelpRequests, {
      requestId: favouriteId,
    });
    // добавить id в стор
    return favouriteId;  // возращаем ID, если успешно добавили
  }
);

export const removeFromFavouritesAction = createAsyncThunk<string, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'favourites/removeFromFavourites',
  async (favouriteId, { extra: api }) => {
    await api.delete(`${APIRoute.FavouritesHelpRequests}/${favouriteId}`);
    return favouriteId;  // возращаем ID, если успешно удалили
  }
);

export const fetchRequestAction = createAsyncThunk<HelpRequest, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'helpRequests/fetchRequestAction',
  async (id, { extra: api }) => {
    const response = await api.get(`${APIRoute.HelpRequests}/${id}`);
    return response.data;
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<IAuth>(APIRoute.Login, {login, password});
    saveToken(data.token);
    dispatch(setAuthorized());
    //dispatch(redirectToRoute(AppRoute.Main)); // TODO: по возможности переписать редирект, убрав из компонента
  },
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
);*/
