import { APIMethod, APIRoute, BASE_URL } from '../const/const'
import { HelpRequest } from '../types/HelpRequest'

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
    try {
      const res = await fetch(`${fullUrl}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: body,
      })
      return await res.json()
    } catch (e) {
      throw new Error('Something went wrong while fetching!')
    }
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
    const res = await this.fetchDataWithToken(APIRoute.User, APIMethod.GET)
    return res
  }

  async getHelpRequests(): Promise<HelpRequest[]> {
    const res = await this.fetchDataWithToken(APIRoute.HelpRequests, APIMethod.GET);
    return res as HelpRequest[]; // Явное приведение к типу HelpRequest[]
  }
}

export const api = new ApiService(BASE_URL)

api.getUser().then((res) => console.log(res))
