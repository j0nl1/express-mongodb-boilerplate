import P from 'pino';

declare global {
  namespace NodeJS {
    interface Global {
      logger: P.Logger;
    }
    interface ProcessEnv {
      PORT: string;
      DOT_ENV: string;
      LOG_LEVEL: string;
      DB_NAME: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_HOSTNAME: string;
      DOMAIN: string;
    }
  }
  const logger: P.Logger;
}
