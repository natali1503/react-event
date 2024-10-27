import { APIMethod, APIRoute, BASE_URL } from '../const/const'
import { IUser } from '../types/IUser'

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  // метод, которые принимает параметры для запроса и подтыкает authorization
  private async fetchDataWithToken<T>(
    fullUrl: APIRoute,
    method: APIMethod,
    body?: string
  ): Promise<T> {
    const res = await fetch(`${fullUrl}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: body,
    })

    // if (!res.ok) {
    //   const errorData = await res.json()
    //   const error = new Error(errorData.message)
    //   error.status = res.status
    //   // debugger
    //   throw error
    // }
    if (!res.ok) {
      // Пытаемся прочитать ответ как JSON или как текст
      let errorMessage: string
      try {
        // Проверка JSON формата
        const contentType = res.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json()
          errorMessage = errorData.message || 'An error occurred'
        } else {
          // Если не JSON, читаем как текст
          errorMessage = await res.text()
        }
      } catch (e) {
        errorMessage = 'An error occurred while processing the error response'
      }

      // Выбрасываем сериализуемый объект ошибки
      throw {
        message: errorMessage,
        status: res.status,
      }
    }

    return await res.json()
  }

  async login(login: string, password: string): Promise<any> {
    const body = await JSON.stringify({ password: password, login: login })

    const res = await fetch(APIRoute.Login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    return await res.json()
  }

  async getUser() {
    const res = await this.fetchDataWithToken<IUser>(
      APIRoute.User,
      APIMethod.GET
    )
    return res
  }
}

export const api = new ApiService(BASE_URL)

// api.getUser().then((res) => console.log(res))
