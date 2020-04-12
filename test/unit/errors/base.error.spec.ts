import { BaseError } from '../../../src/errors';
import { STANDARD_ERROR } from '../../../src/utils/constants';

describe('BaseError Middleware', () => {
  const baseError = new BaseError();
  it('should return error 500 if status is not provided', () => {
    expect(baseError.status).toBe(500);
  });
  it('should return default message if message is not provided', () => {
    expect(baseError.message).toBe(STANDARD_ERROR);
  });
  it('name should be the constructor name', () => {
    expect(baseError.name).toBe('BaseError');
  });
  it('should assign message if it is provided', () => {
    const errorMessage = new BaseError('ERROR');
    expect(errorMessage.message).toBe('ERROR');
  });
  it('should assign status if it is provided', () => {
    const errorStatus = new BaseError('ERROR', 400);
    expect(errorStatus.status).toBe(400);
  });
});
