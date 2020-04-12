import * as controllers from '../../../src/controllers';
import * as services from '../../../src/services';
import httpMock, { MockResponse, MockRequest } from 'node-mocks-http';
import { fakeUserModel } from '../../mock/authentication';
import { Response, Request, NextFunction } from 'express';

let res: MockResponse<Response>;
let req: MockRequest<Request>;
let next: NextFunction;

describe('Auth Controller', () => {
  beforeEach(() => {
    res = httpMock.createResponse();
    req = httpMock.createRequest();
    next = jest.fn((error) => {
      res.status(500);
      res.send(error.message);
    });
    jest.clearAllMocks();
  });

  describe('LoginAuth', () => {
    it('should call to login method and return an user if everything goes well', async () => {
      const spyService = jest.spyOn(services, 'login').mockResolvedValueOnce(fakeUserModel);
      req.body = { email: fakeUserModel.email, password: fakeUserModel.password };
      await controllers.LoginAuth(req, res, next);

      expect(spyService).toHaveBeenCalledWith(fakeUserModel.email, fakeUserModel.password);
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toStrictEqual(JSON.stringify(fakeUserModel));
    });

    it('should call next function in case of error', async () => {
      jest.spyOn(services, 'login').mockRejectedValueOnce(new Error());

      try {
        await controllers.LoginAuth(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(next).toHaveBeenCalledWith(error);
      }
    });
  });

  describe('SignupAuth', () => {
    it('should call to signup method and return the user after to be saved', async () => {
      const spyService = jest.spyOn(services, 'signup').mockResolvedValueOnce(fakeUserModel);
      req.body = fakeUserModel;
      await controllers.SignupAuth(req, res, next);

      expect(spyService).toHaveBeenCalledWith(fakeUserModel);
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toStrictEqual(JSON.stringify(fakeUserModel));
    });

    it('should call next function in case of error', async () => {
      jest.spyOn(services, 'signup').mockRejectedValueOnce(new Error());

      try {
        await controllers.SignupAuth(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(next).toHaveBeenCalledWith(error);
      }
    });
  });
});
