import { BaseError } from './base.error';

export class MissingDataError extends BaseError {
  constructor(message?: string) {
    super(message || 'The request could not be understood by the server due to malformed syntax', 400);
  }
}
