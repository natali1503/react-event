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

  async login(login: string, password: string): Promise<any> {
    const body = await JSON.stringify({ password: password, login: login })

    const res = await fetch('http://localhost:4040/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    return await res.json()
  }

  // requestWithAuthToken потом удалить, просто для теста
  async requestWithAuthToken(token: string) {
    const res = await fetch('http://localhost:4040/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    return await res.json()
  }
}

export const api = new ApiService(BASE_URL)

//api.login('testUser15@test.com', 'password15').then((res) => console.log(res))

// api
//   .requestWithAuthToken(
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczYjcxYmUxLWI5NzQtNDcwNS1iYWZkLTU4ZmFiNDEwN2VkNSIsImlhdCI6MTcyOTk0NDM5NCwiZXhwIjoxNzI5OTQ3OTk0fQ.q8DAcpPH4FRebgC0jQGyZ85ZItZNjnpYSNvNFgth4qU'
//   )
//   .then((res) => console.log(res))
