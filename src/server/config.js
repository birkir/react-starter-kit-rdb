import url from 'url';

if (!process.env.CLIENT) {
  require('dotenv').config({
    silent: true,
  });
}

const config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || 3000,
  ws: url.parse(process.env.DATABASE_WS || 'http://localhost:3000/db'),
  db: url.parse(process.env.DATABASE_URL || 'rdb://localhost:28015/test'),
};

config.dbName = config.db.path.substr(1);
config.isDev = (config.env === 'development');

export default config;
