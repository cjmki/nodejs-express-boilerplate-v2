import winston from 'winston';
import path from 'path';
import config from './config';

const LOG_FILE_NAME = 'server.log';
const LOG_FILE_NAME_ERROR = 'error.log';

const FILE_PATH = path.join(config.storage.base, LOG_FILE_NAME);
const FILE_PATH_ERROR = path.join(config.storage.base, LOG_FILE_NAME_ERROR);

let LOG_LEVEL = 'debug';

if (config.env.isProd) LOG_LEVEL = 'verbose';
else if (config.env.isTest) LOG_LEVEL = 'error';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }

  return info;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env.isDev ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({ level: LOG_LEVEL }),
    new winston.transports.File({ level: LOG_LEVEL, filename: FILE_PATH }),
    new winston.transports.File({
      level: 'error',
      filename: FILE_PATH_ERROR,
    }),
  ],
});

export default logger;
