import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken } from '../services/token';
import { HelpRequest } from '../types/HelpRequest';
import { IProfileData } from '../types/IUser';
import { setFavourites } from './user-favourites/userFavourites';
import { setAuthorized } from './authorization';
import { APIRoute } from '../const/const';
import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from './types';
import { AuthData } from '../types/auth-data';
import { IAuth } from '../types/IAuth';

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

export const getFavouritesAction = createAsyncThunk<string[], void, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'favourites/getFavouritesAction',
  async (_, {extra: api}) => {
    const response = await api.get(APIRoute.FavouritesHelpRequests);
    return response.data;
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
