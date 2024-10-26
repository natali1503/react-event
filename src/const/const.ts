export enum AppRoute {
  Login = '/login',
  Main = '/',
  Profile = '/profile',
  HelpRequest = '/request/:id',
}

// const BASE_URL = '/api'
export const BASE_URL = 'http://localhost:4040/'

export enum APIRoute {
  HelpRequests = `${BASE_URL}/request`,
  Login = `${BASE_URL}/auth`,
  FavoriteHelpRequests = `${BASE_URL}/user/favorites`,
  User = `${BASE_URL}/user`,
}
