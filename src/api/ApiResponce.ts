import { ApiCustomError } from '../types/IError';

export class ApiResponce<T> {
  success: boolean;
  data: T | null;
  error?: ApiCustomError;

  constructor(success: boolean, data: T | null, error?: ApiCustomError) {
    this.data = data;
    this.error = error;
    this.success = success;
  }
}
