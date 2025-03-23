import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { saveToken } from '../services/token';
import { IProfileData } from '../types/IUser';
import { API_ROUTE } from '../const/const';
import { AuthData } from '../types/auth-data';
import { IAuth } from '../types/IAuth';
import { IHelpRequest } from '../types/helpRequest';

import { setFavourites } from './user-favourites/userFavourites';
import { setAuthorized } from './authorization/authorizationSlice';
import { AppDispatch, RootState } from './types';
import { resetFormAuthorization } from './formAuthorization';

export const fetchHelpRequestsAction = createAsyncThunk<
  IHelpRequest[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('helpRequests/fetchHelpRequests', async (_, { extra: api }) => {
  const response = await api.get(API_ROUTE.HelpRequests);
  return response.data;
});

export const fetchContributeToRequest = createAsyncThunk<
  string,
  { id: string },
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('helpRequests/contributeToRequest', async ({ id }, { extra: api }) => {
  const response = await api.post(`${API_ROUTE.HelpRequests}/${id}/contribution`);
  return response.data;
});

export const getUserAction = createAsyncThunk<
  IProfileData,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('profile/user', async (_, { dispatch, extra: api }) => {
  const response = await api.get(API_ROUTE.User);
  const { favouriteRequests } = response.data;
  dispatch(setFavourites(favouriteRequests));
  return response.data;
});

export const getFavouritesAction = createAsyncThunk<
  string[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('favourites/getFavouritesAction', async (_, { extra: api }) => {
  const response = await api.get(API_ROUTE.FavouritesHelpRequests);
  return response.data;
});

export const addToFavouritesAction = createAsyncThunk<
  string,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('favourites/addToFavourites', async (favouriteId, { extra: api }) => {
  await api.post(API_ROUTE.FavouritesHelpRequests, {
    requestId: favouriteId,
  });
  return favouriteId;
});

export const removeFromFavouritesAction = createAsyncThunk<
  string,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('favourites/removeFromFavourites', async (favouriteId, { extra: api }) => {
  await api.delete(`${API_ROUTE.FavouritesHelpRequests}/${favouriteId}`);
  return favouriteId;
});

export const fetchRequestAction = createAsyncThunk<
  IHelpRequest,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('helpRequests/fetchRequestAction', async (id, { extra: api }) => {
  const response = await api.get(`${API_ROUTE.HelpRequests}/${id}`);
  return response.data;
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('user/login', async ({ login, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<IAuth>(API_ROUTE.Login, { login, password });
  saveToken(data.token);
  dispatch(setAuthorized());
  dispatch(resetFormAuthorization());
  //dispatch(redirectToRoute(APP_ROUTE.Main)); // TODO: по возможности переписать редирект, убрав из компонента
});
