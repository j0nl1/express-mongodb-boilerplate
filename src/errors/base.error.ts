import { STANDARD_ERROR } from '../utils/constants';

export class BaseError extends Error {
  status: number;
  constructor(message?: string, status?: number) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message || STANDARD_ERROR;

    this.status = status || 500;
  }
}
