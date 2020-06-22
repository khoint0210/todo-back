import express from 'express';
import path from 'path';
import notifier from 'node-notifier';

import constants from './config/constants';
import configMiddlewares from './config/middlewares';
import './config/database';
import apiRoutes from './modules';

const app = express();

configMiddlewares(app);

apiRoutes(app);

app.listen(constants.PORT, err => {
  if (err) {
    if (process.env.NODE_ENV === 'dev') {
      notifier.notify({
        title: 'Todo app',
        message: err.message,
        icon: path.join(__dirname, 'assets/icon.png'),
      });
    }
    throw err;
  } else {
    console.log(`
      Service is up on port ${constants.PORT} 🐳
      ---
      Running on ${process.env.NODE_ENV} ☎️
      ---`);
    if (process.env.NODE_ENV === 'dev') {
      notifier.notify({
        title: 'todo-list service',
        message: `Service is up on port ${constants.PORT} 🎉`,
        icon: path.join(__dirname, 'assets/icon.png'),
      });
    }
  }
});
