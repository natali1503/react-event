import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL, REQUEST_TIMEOUT } from '../const/const';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';
import { toast } from 'react-toastify';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.FORBIDDEN]: true,
  [StatusCodes.INTERNAL_SERVER_ERROR]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig ) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response && shouldDisplayError(error.response)) {
        switch(error.response.status) {
          case StatusCodes.INTERNAL_SERVER_ERROR:
            toast.error('Ошибка! Попробуйте еще раз');
            break;
          case StatusCodes.BAD_REQUEST:
            toast.error('Неверный логин или пароль');
            break;
          case StatusCodes.FORBIDDEN:
            toast.info('Время сессии истекло. Авторизуйтесь снова.');
            break;
          default:
            toast.error(`Ошибка! ${error.response.data.message}`);
        }

      }
      throw error;
    }
  );

  return api;
};
