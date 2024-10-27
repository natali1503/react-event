import { APIMethod, APIRoute, BASE_URL } from '../const/const';
import { IUser } from '../types/IUser';
import { toast } from 'react-toastify';
import { IError } from '../types/IError';
import { IAuth } from '../types/IAuth';
import { HelpRequest } from '../types/HelpRequest';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

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

  async login(login: string, password: string): Promise<T | IError> {
    try {
      const body = await JSON.stringify({ password: password, login: login });

      const res = await fetch(APIRoute.Login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (!res.ok && res.status === 500) {
        // запланированная ошибка сервера, логин пароль может и правильный
        //debugger;
        toast.error('Ошибка на сервере! Попробуйте еще раз');
        return {
          codeError: res.status,
          message: 'IG: Planned server error',
        } as IError;
      }

      if (!res.ok && res.status === 400) {
        // неправильный логин пароль
        toast.error('Неправильный логин пароль! Попробуйте еще раз');
        debugger;
        return {
          codeError: res.status,
          message: 'IG: Invalid credentials',
        } as IError;
      }
      return await res.json();
    } catch (e) {
      // запланированная ошибка сервера
      debugger;
      toast.error('Ошибка! Попробуйте еще раз');
      return { codeError: 500, message: String(e) };
    }
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

  async getHelpRequests(): Promise<HelpRequest[]> {
    const res = await this.fetchDataWithToken(
      APIRoute.HelpRequests,
      APIMethod.GET
    );
    return res as HelpRequest[]; // Явное приведение к типу HelpRequest[]
  }
}

export const api = new ApiService(BASE_URL);
