import { HealthStatus } from '../../../src/controllers';
import httpMock, { MockResponse, MockRequest } from 'node-mocks-http';
import { Response, Request } from 'express';
import { readFileSync } from 'fs';
import { ENCODING_UTF8 } from '../../../src/utils/constants';

const pjson = JSON.parse(readFileSync('./package.json', ENCODING_UTF8));

const res: MockResponse<Response> = httpMock.createResponse();
const req: MockRequest<Request> = httpMock.createRequest();

describe('Health Controller', () => {
  beforeEach(() => {
    HealthStatus(req, res);
  });
  it('should return status 200', () => {
    expect(res.statusCode).toBe(200);
  });
  it('should return the name of the project', () => {
    expect(res._getData().name).toBe(pjson.name);
  });
  it('should return the version of the project', () => {
    expect(res._getData().version).toBe(pjson.version);
  });
  it('should return mongoose status', () => {
    expect(res._getData().mongodb.status).toBe('disconnected');
  });
});
