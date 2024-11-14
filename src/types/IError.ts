export interface IError {
  codeError: number;
  message: string;
}

export class ApiCustomError {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}

// пользователь неправильно ввел логин или пароль, использую в Auth
export class WrongCredentialsError extends ApiCustomError {
  constructor() {
    super(400, 'Неверный логин или пароль');
  }
}

// Запланированная ошибка сервера или любая другая, когда не получили данные
export class ServerError extends ApiCustomError {
  constructor() {
    super(500, 'Запланированная ошибка сервера');
  }
}

// Неправильный авторизационный токен - просрочился либо поменяли сами
export class UnauthorizedError extends ApiCustomError {
  constructor() {
    super(403, 'Пользователь не авторизован');
  }
}
