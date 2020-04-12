import * as customMiddlewares from '../middlewares';
import { Application } from 'express';

export const middlewares = (app: Application): void => {
  Object.values(customMiddlewares).forEach((middleware) => app.use(middleware));
};
