export interface ISuccessResponse {
  statusCode: number;
  message: string;
  results: any;
}

export interface IErrorResponse {
  statusCode: number;
  error: string;
  message: string;
}