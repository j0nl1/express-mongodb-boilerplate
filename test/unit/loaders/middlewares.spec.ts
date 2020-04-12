import * as customMiddlewares from '../../../src/middlewares';
import { middlewares } from '../../../src/loaders';
import { Application } from 'express';

describe('Loader Middlewares', () => {
  it('should load all middlewares', () => {
    const app = ({ use: jest.fn() } as unknown) as Application;
    const spyAppUse = jest.spyOn(app, 'use');
    middlewares(app);
    expect(spyAppUse).toHaveBeenCalledTimes(Object.keys(customMiddlewares).length);
  });
});
