import mongoose from 'mongoose';

import constants from './constants';

mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
  .once('open', () => (process.env.ENV === "test") ? console.log('      MongoDB Running 🍻') : "")
  .on('error', e => {
    throw e;
  });
