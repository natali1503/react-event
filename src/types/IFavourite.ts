export interface IFavourite {
  id: string
};

export interface IResponse {
  success: boolean; 
  message?: string; 
  data?: IFavourite[]; 
  codeError?: number;
};