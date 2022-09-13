import config from '../config/config';
import logger from '../config/logger';

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  const data = {
    status: err.status || 500,
    message: err.message,
  };

  if (data.status === 500) {
    data.message = 'internal server error';
  }

  if (config.env.isDev) {
    data.error = err.stack;
    logger.error(err.stack);
  }

  res.status(err.status || 500).json({ error: data });
};
