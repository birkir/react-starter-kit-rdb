import _extend from 'lodash/extend';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { DefaultSession as session } from 'react-rethinkdb';
import routes from './routes';
import config from './server/config';

// Extract properties from config
const { ws, dbName } = config;

// Connect to rethinkdb
session.connect({
  host: ws.hostname,
  port: ws.port,
  path: ws.path,
  secure: (ws.protocol === 'https'),
  db: dbName,
});

// Inject session to router components
const createElement = (Component, props) => {
  _extend(props, { session });
  return <Component {...props} />;
};

// Render the application
ReactDOM.render(
  <Router createElement={createElement} history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('root')
);
