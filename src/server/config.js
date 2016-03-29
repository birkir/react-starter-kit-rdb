import url from 'url';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    silent: true,
  });
}

const PORT = process.env.PORT || 3000;

const config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOSTNAME || 'localhost',
  port: PORT,
  ws: url.parse(process.env.DATABASE_WS || `http://localhost/db`),
  db: url.parse(process.env.DATABASE_URL || 'rdb://localhost:28015/test'),
};

config.ws.port = PORT;
config.dbName = config.db.path.substr(1);
config.isDev = (config.env === 'development');

export default config;
