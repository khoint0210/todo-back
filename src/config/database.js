import mongoose from 'mongoose';

import constants from './constants';

mongoose.Promise = global.Promise;

mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true });

mongoose.connection
  .once('open', () => console.log('      MongoDB Running 🍻'))
  .on('error', e => {
    throw e;
  });
