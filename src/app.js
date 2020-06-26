import express from 'express';

import './config/database';
import middlewaresConfig from './config/middlewares';
import apiRoutes from './modules';

const app = express();

middlewaresConfig(app);

apiRoutes(app);

export default app;
