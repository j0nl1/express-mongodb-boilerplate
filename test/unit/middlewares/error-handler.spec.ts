import { errorHandler } from '../../../src/middlewares';
import httpMock, { MockResponse, MockRequest } from 'node-mocks-http';
import { Response, Request, NextFunction } from 'express';
import { IError } from '../../../src/interfaces/configurations';

describe('Middleware Error-Handler', () => {
  const next = {} as NextFunction;
  let res: MockResponse<Response>;
  let req: MockRequest<Request>;

  beforeEach(() => {
    res = httpMock.createResponse();
    req = httpMock.createRequest();
    jest.clearAllMocks();
  });

  it("should return error 500 if not error hasn't status", () => {
    errorHandler(new Error(), req, res, next);

    expect(res.statusCode).toBe(500);
  });
  it('should return error if error has status', () => {
    const myError = new Error() as IError;
    const errorCode = 417;
    myError.status = errorCode;
    errorHandler(myError, req, res, next);

    expect(res.statusCode).toBe(errorCode);
  });

  it("should return a predefined message if not error hasn't message", () => {
    errorHandler(new Error(), req, res, next);

    expect(res._getJSONData()).toStrictEqual('Something went wrong');
  });

  it('should return error message if error has message', () => {
    const errorMessage = 'FAKE_ERROR';
    const myError = new Error(errorMessage);
    errorHandler(myError, req, res, next);

    expect(res._getJSONData()).toBe(errorMessage);
  });
});
