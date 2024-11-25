import { APIMethod, APIRoute } from '../const/const';
import { IUser } from '../types/IUser';
import { toast } from 'react-toastify';
import { IError } from '../types/IError';
import { HelpRequest } from '../types/HelpRequest';

class ApiService {
  // метод, которые принимает параметры для запроса и подтыкает authorization
  private async fetchDataWithToken<T>(
    fullUrl: string,
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

      const contentType = res.headers.get('Content-Type') || '';
      
      if (res.ok) {
        if (contentType.includes('application/json')) {
          return (await res.json()) as T;
        } else {
          // Если ответ не JSON, возвращаем текст
          return (await res.text()) as unknown as T; // Приводим текст к типу T
        }
       // return (await res.json()) as T;
      }
      else {
        const errorMessage = contentType.includes('application/json')
        ? await res.json()
        : await res.text();

        return {
          codeError: res.status,
          message: errorMessage
        } as IError;
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
    } else return res;
  }

  async getUserFavourites() {
    const res: string[] | IError = await this.fetchDataWithToken(
      APIRoute.FavouritesHelpRequests,
      APIMethod.GET
    );

    const isCodeError = (object): object is IError => {
      return 'codeError' in object;
    };
    if (isCodeError(res)) {
      throw new Error(String(res.codeError));
    } else return res;
  }

  async contributeToRequest(id: string): Promise<string | IError> {
    const url = `${APIRoute.HelpRequests}/${id}/contribution`;
    return this.fetchDataWithToken<string | IError>(url, APIMethod.POST);
  }

  async addToFavourites(favouriteId: string) {
    try {
      const body = JSON.stringify({ requestId: favouriteId });
      const res: string | IError = await this.fetchDataWithToken(
        APIRoute.FavouritesHelpRequests,
        APIMethod.POST,
        body
      );

      if ((res as IError).message && (res as IError).codeError) {
        return res as IError;
      }
      
      return res as string;

    } catch (error) {
      console.error('Unexpected error while adding to favourites:', error);
      return error as IError;
    }
  };

  async removeFromFavourites(favouriteId: string) {
    try {
      const url = `${APIRoute.FavouritesHelpRequests}/${favouriteId}` as APIRoute;
  
      const res: string | IError = await this.fetchDataWithToken(
        url, 
        APIMethod.DELETE
      );
  
      if ((res as IError).message && (res as IError).codeError) {
        return res as IError;
      }
    
      return res as string;

    } catch (error) {
      console.error('Unexpected error while removing from favourites:', error);
      return error as IError;;
    };
  };
};

export const api = new ApiService();