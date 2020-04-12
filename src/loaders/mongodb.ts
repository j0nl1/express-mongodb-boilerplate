import { PRODUCTION, MONGO_SECURE, MONGO_INSECURE } from '../utils/constants';
import mongoose from 'mongoose';

const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_NAME, NODE_ENV } = process.env;
const PROTOCOL = NODE_ENV === PRODUCTION ? MONGO_SECURE : MONGO_INSECURE;

export const mongodb = async () => {
  try {
    const databaseUrl = `${PROTOCOL}//${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}/${DB_NAME}`;
    logger.trace(databaseUrl);
    const mongoConnection = await mongoose.connect(databaseUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
    const databaseName = mongoConnection.connections[0].db.databaseName;
    logger.info(`Connected to Mongo! Database name: ${databaseName}`);
  } catch (error) {
    logger.error(`Error connecting to mongo database, Error description: ${error}`);
  }
};
