import pino from 'pino';

const level = process.env.LOG_LEVEL || 'info';

global.logger = pino({ level, prettyPrint: { levelFirst: true, translateTime: 'SYS:HH:MM:ss', ignore: 'hostname,pid' } });
