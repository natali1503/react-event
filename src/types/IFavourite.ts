export interface IFavourite {
  id: string;
}

export interface IResponse {
  success: boolean;
  description?: string;
  data?: IFavourite[];
  codeError?: number;
}
