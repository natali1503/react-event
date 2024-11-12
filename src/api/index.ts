import { APIMethod, APIRoute } from '../const/const';
import { IUser } from '../types/IUser';
import { toast } from 'react-toastify';
import { IError } from '../types/IError';
import { HelpRequest } from '../types/HelpRequest';

class ApiService {
  // метод, которые принимает параметры для запроса и подтыкает authorization
  private async fetchDataWithToken<T>(
    fullUrl: APIRoute,
    method: APIMethod,
    body?: string
  ): Promise<T | IError> {
    try {
      const res = await fetch(`${fullUrl}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: body,
      });
      if (res.ok) return (await res.json()) as T;
      else {
        return { codeError: res.status, message: await res.json() } as IError;
      }
    } catch (e) {
      toast.error('Ошибка! Попробуйте еще раз');
      console.log(e);
      return { codeError: 500, message: String(e) };
    }
  }

  async login<T>(login: string, password: string): Promise<T | IError> {
    const body = JSON.stringify({ password: password, login: login });
    return await this.fetchDataWithToken<T>(
      APIRoute.Login,
      APIMethod.POST,
      body
    );
  }

  async getUser() {
    const res: IUser | IError = await this.fetchDataWithToken(
      APIRoute.User,
      APIMethod.GET
    );

    const isCodeError = (object): object is IError => {
      return 'codeError' in object;
    };
    if (isCodeError(res)) {
      throw new Error(String(res.codeError));
    } else return res;
  }

  async getHelpRequests() {
    const res: HelpRequest[] | IError = await this.fetchDataWithToken(
      APIRoute.HelpRequests,
      APIMethod.GET
    );

    const isCodeError = (object): object is IError => {
      return 'codeError' in object;
    };
    if (isCodeError(res)) {
      throw new Error(String(res.codeError));
    } else return res; // Явное приведение к типу HelpRequest[]
  }

  async getUserFavourites() {
    const res: string[] | IError = await this.fetchDataWithToken(
      APIRoute.FavoriteHelpRequests,
      APIMethod.GET
    );

    const isCodeError = (object): object is IError => {
      return 'codeError' in object;
    };
    if (isCodeError(res)) {
      throw new Error(String(res.codeError));
    } else return res;
  }
}

export const api = new ApiService();
