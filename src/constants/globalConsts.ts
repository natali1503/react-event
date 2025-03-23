export const enum APP_ROUTE {
  Login = '/login',
  Main = '/',
  Profile = '/profile',
  HelpRequest = '/request/:id',
}

export const AUTH_TOKEN_KEY_NAME = 'charitable-react-event-token';

export const REQUEST_TIMEOUT = 5000;

//export const BASE_URL = 'http://localhost:4040/api';
export const BASE_URL = 'https://natticharity.eveloth.ru/api';

export const enum API_ROUTE {
  HelpRequests = `${BASE_URL}/request`,
  Login = `${BASE_URL}/auth`,
  FavouritesHelpRequests = `${BASE_URL}/user/favourites`,
  User = `${BASE_URL}/user`,
  ContributeToRequest = `${BASE_URL}/request/{id}/contribution`,
}

export const TEST_USERS = [
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
    name: 'Третий пользователь',
    login: 'testUser17@test.com',
    password: 'password17',
  },
];

export const enum VIEW_TOGGLE_OPTIONS {
  Grid = 'grid',
  List = 'list',
  Map = 'map',
}
