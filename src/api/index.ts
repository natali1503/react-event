import { APIMethod, APIRoute, BASE_URL } from '../const/const';
import { IUser } from '../types/IUser';
import { toast } from 'react-toastify';
import { APIMethod, APIRoute, BASE_URL } from '../const/const';
import { IError } from '../types/IError';
import { IUser } from '../types/IUser';

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

    // return await res.json()
  }

  async login(login: string, password: string): Promise<any> {
    const body = await JSON.stringify({ password: password, login: login });

    const res = await fetch(APIRoute.Login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    return await res.json();
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
}

export const api = new ApiService(BASE_URL);

// if (!res.ok) {
//   // Пытаемся прочитать ответ как JSON или как текст
//   let errorMessage: string
//   try {
//     // Проверка JSON формата
//     const contentType = res.headers.get('content-type')
//     if (contentType && contentType.includes('application/json')) {
//       const errorData = await res.json()
//       errorMessage = errorData.message || 'An error occurred'
//     } else {
//       // Если не JSON, читаем как текст
//       errorMessage = await res.text()
//     }
//   } catch (e) {
//     errorMessage = 'An error occurred while processing the error response'
//   }

//   // Выбрасываем сериализуемый объект ошибки
//   throw {
//     message: errorMessage,
//     status: res.status,
//   }
//return await res.json()

// async getUser() {

//       const res = await this.fetchDataWithToken<IUser>(
//         APIRoute.User,
//         APIMethod.GET
//       )
//       return res
//     }
