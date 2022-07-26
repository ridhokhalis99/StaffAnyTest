import { HttpError } from '../classes/HttpError';
import { IErrorResponse } from '../interfaces/response';
import { ResponseToolkit } from '@hapi/hapi';

export const errorHandler = (h: ResponseToolkit, err: any) => {
  if (err instanceof HttpError) {
    return h.response({
      error: err.name,
      statusCode: err.status,
      message: err.message
    } as IErrorResponse).code(err.status);
  }

  return h.response({
    statusCode: 500,
    error: "Internal server error",
    message: err.message
  } as IErrorResponse).code(500);
}