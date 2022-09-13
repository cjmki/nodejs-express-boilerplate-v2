import express from 'express';
import bodyParser from 'body-parser';
import morgan from './config/morgan';
import logger from './config/logger';
import config from './config/config';
import errorMiddleware from './middlewares/error';
import setupRoutes from './routes';
import 'regenerator-runtime/runtime';
import 'core-js/stable';
import sanityChecker from './util/sanityChecker';

const app = express();

app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.get('/health', (req, res) => {
  res.status(200).send('health : ok');
});

setupRoutes(app, '/api/v1');

app.use(errorMiddleware);

logger.info(`Application env : ${process.env.NODE_ENV}`);

app.listen(config.port, (err) => {
  if (err) {
    logger.error(err);
  } else {
    logger.info(`Server listening on : ${config.port}`);
  }
});

sanityChecker.initiate();

export default app;
