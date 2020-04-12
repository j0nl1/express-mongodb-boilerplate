import { NextFunction, Request, Response } from 'express';
import { IError } from '../interfaces/configurations';
import { STANDARD_ERROR } from '../utils/constants';

export const errorHandler = (error: IError, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || STANDARD_ERROR;
  res.status(status).json(message);
};
