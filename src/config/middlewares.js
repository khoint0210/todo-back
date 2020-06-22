import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import constants from './constants';

const isDev = process.env.NODE_ENV === 'dev';
const isProd = process.env.NODE_ENV === 'prod';

export default app => {
  if (isDev) {
    app.use(cors());
    app.use(morgan('dev'));
  }

  if (isProd) {
    app.use(compression());
    app.use(helmet());
    app.use(cors({ origin: constants.CORS_REMOTE }));
  }

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.disable('etag');
};
