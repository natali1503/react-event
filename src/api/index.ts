import { User } from '../store/rtkSlice'

const BASE_URL = 'https://jsonplaceholder.typicode.com'
const USERS = '/users'

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  // переработать метод, чтобы принимал опции GET POST, тело запроса
  private async fetchData<T>(endPoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endPoint}`)

    if (!res.ok) {
      throw new Error('Something went wrong while fetching!')
    }

    return await res.json()
  }

  private async delay(ms: number) {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve('Ok!')
      }, ms)
    })
  }

  async getAllUsers() {
    await this.delay(2000)
    return await this.fetchData<User[]>(USERS)
  }

  async getUserById(id: number) {
    const endpoint = `${USERS}/${id}`
    return await this.fetchData<User>(endpoint)
  }
}

export const api = new ApiService(BASE_URL)
