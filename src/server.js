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

setupRoutes(app, '/');

app.use(errorMiddleware);

app.use((req, res) => {
  console.log('No route matched');
  res.status(404).json({ error: { message: '404' } });
});

if (!config.env.isTest) {
  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    } else {
      logger.info(`Running on port ${config.port}`);
    }
  });
}

sanityChecker.initiate();

export default app;
