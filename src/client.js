import _extend from 'lodash/extend';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { DefaultSession as session } from 'react-rethinkdb';
import routes from './routes';

// Extract properties from config
const location = window.location;
const secure = (location.protocol === 'https:');
const port = secure ? 443 : 80;

// Connect to rethinkdb
session.connect({
  host: location.hostname,
  port,
  path: _wsPath, // eslint-disable-line
  secure,
  db: _dbName, // eslint-disable-line
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
