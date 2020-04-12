import { Application } from 'express';
import * as routes from '../routes';
import { PREFIX_API_URL } from '../utils/constants';
import { IRouter } from '../interfaces/configurations';

export const router = (app: Application): void => {
  Object.values(routes).forEach((route: IRouter) => app.use(PREFIX_API_URL + route.path, route.router));
};
