import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';
import cors from 'cors';

import constants from './constants';

const isProd = process.env.NODE_ENV === 'prod';

export default app => {

  if (isProd) {
    app.use(compression());
    app.use(helmet());
    app.use(cors({ origin: constants.CORS_REMOTE }));
  }

  app.use(morgan('tiny'));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(cors());

};
