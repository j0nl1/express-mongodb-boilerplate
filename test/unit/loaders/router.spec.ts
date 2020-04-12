import * as routes from '../../../src/routes';
import { router } from '../../../src/loaders';
import { Application } from 'express';

describe('Loader Router', () => {
  it('should load all routes', () => {
    const app = ({ use: jest.fn() } as unknown) as Application;
    const spyAppUse = jest.spyOn(app, 'use');
    router(app);
    expect(spyAppUse).toHaveBeenCalledTimes(Object.keys(routes).length);
  });
});
