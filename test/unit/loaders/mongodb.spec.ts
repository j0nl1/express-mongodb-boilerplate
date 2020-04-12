import mongoose from 'mongoose';
import '../../../src/@types/index.d';
import { mongodb } from '../../../src/loaders';

const DATABASE_NAME = 'express-boilerplate';
const CONNECTION_STRUCTURE = { connections: [{ db: { databaseName: DATABASE_NAME } }] };

describe('Loader MongoDB', () => {
  beforeEach(() => {
    mongoose.connect = jest.fn().mockResolvedValue(CONNECTION_STRUCTURE);
    global.logger.info = jest.fn();
    global.logger.error = jest.fn();
  });

  it('should call logger.trace to show databaseUri', () => {
    const spyLoggerTrace = jest.spyOn(global.logger, 'trace');

    mongodb();

    expect(spyLoggerTrace).toHaveBeenCalled();
  });

  it('should call mongoose.connect method in order to create a connection with database', () => {
    const spyMongooseConnect = jest.spyOn(mongoose, 'connect');

    mongodb();

    expect(spyMongooseConnect).toHaveBeenCalled();
  });

  it('should call logger.error when there is a connection error', async () => {
    const spyLoggerError = jest.spyOn(global.logger, 'error');
    const spyMongooseConnect = jest.spyOn(mongoose, 'connect').mockRejectedValueOnce(new Error());
    try {
      await mongodb();
    } catch (error) {
      expect(spyMongooseConnect).toHaveBeenCalled();
      expect(spyLoggerError).toHaveBeenCalled();
      expect(error).toBeInstanceOf(Error);
    }
  });
});
