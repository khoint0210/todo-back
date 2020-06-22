const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/todolist-dev',
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost:27017/todolist-test',
};

const prodConfig = {
  MONGO_URL: process.env.MONGODB,
};

const defaultConfig = {
  PORT: process.env.PORT || 5321,
  JWT_SECRET: 't0ps3cr3t!',
};

function envConfig(env) {
  switch (env) {
    case 'dev':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
