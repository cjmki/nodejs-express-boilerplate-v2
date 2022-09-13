import morgan from 'morgan';
import logger from './logger';
import config from './config';

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const successResponseFormat = `:date[web] | :remote-addr | :method | :url | :status | :total-time[2] ms`;
const errorResponseFormat = `:date[web] | :remote-addr | :method | :url | :status | :total-time[2] ms`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: {
    write: (message) => {
      if (!config.env.isTest) logger.error(message.trim());
    },
  },
});

export default { successHandler, errorHandler };
