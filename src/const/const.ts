export enum AppRoute {
  Login = '/login',
  Main = '/',
  Profile = '/profile',
  HelpRequest = '/request/:id',
  TestPage = '/test', // to delete
}

// const BASE_URL = '/api'
export const BASE_URL = 'https://natticharity.eveloth.ru/api'

export enum APIRoute {
  HelpRequests = `${BASE_URL}/request`,
  Login = `${BASE_URL}/auth`,
  FavoriteHelpRequests = `${BASE_URL}/user/favorites`,
  User = `${BASE_URL}/user`,
}

export enum APIMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

export const testUsers = [
  {
    name: 'Первый пользователь',
    login: 'testUser15@test.com',
    password: 'password15',
  },
  {
    name: 'Второй пользователь',
    login: 'testUser16@test.com',
    password: 'password16',
  },
  {
    name: 'Второй пользователь',
    login: 'testUser17@test.com',
    password: 'password17',
  },
]
