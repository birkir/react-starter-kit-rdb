import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import http from 'http';
import express from 'express';
import webpack from 'webpack';
import { r, listen } from 'rethinkdb-websocket-server';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Router, RouterContext, match } from 'react-router';
import { Session } from 'react-rethinkdb/dist/node';
import config from './server/config';
import routes from './server/routes';

// Setup express app
const app = express();
const { isDev, host, port, ws, db, dbName } = config;

// Connect to rethinkdb
r.connect({
  host: db.hostname,
  port: db.port,
})
.then(conn => {
  // Use database
  conn.use(dbName);

  // Pipe connection to express
  app.use((req, res, next) => {
    req._rdbConn = conn; // eslint-disable-line
    next();
  });

  // Server routes
  routes(app);

  // While deving
  if (isDev) {
    const webpackConfig = require('../webpack/client');

    // Webpack compiler
    const compiler = webpack(webpackConfig);

    // Use dev middleware
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: null,
    }));

    // Use hot reloader middleware
    app.use(require('webpack-hot-middleware')(compiler));

    // Setup default route
    app.get('*', (req, res) => {
      fs.readFile(path.join(__dirname, 'views', 'index.ejs'), 'utf8', (err, data) => {
        const template = ejs.compile(data);
        res.status(200).send(template({
          ROOT: '',
        }));
      });
    });
  } else {
    // Serve built assets
    app.use('/styles.css', express.static('./build/styles.css'));
    app.use('/client.js', express.static('./build/client.js'));
  }

  /**
   * Wildcard route
   */
  app.get('*', (req, res) => {
    // Create session
    const session = new Session();

    session.connect({
      host: ws.hostname,
      port: ws.port,
      path: ws.path,
      secure: (ws.protocol === 'https'),
      db: process.env.DATABASE_NAME,
    });

    // Do a router match
    match({
      routes: (<Router>{require('./routes').default}</Router>),
      location: req.url,
    },
    (err, redirect, props) => {
      if (err) {
        return res.status(500).send(err.message);
      } else if (redirect) {
        return res.redirect(302, redirect.pathname + redirect.search);
      } else if (!props) {
        return res.status(404).send('not found');
      }

      // Attach session to params
      props.params.session = session; // eslint-disable-line

      // Router context element
      const elem = (<RouterContext {...props} />);
      let isSent;

      // Render to string to kickstart database requests
      ReactDOMServer.renderToString(elem);

      // Render DOM callback
      const renderDOM = () => {
        if (!isSent) {
          // Render again (with data)
          const ROOT = ReactDOMServer.renderToString(elem);

          // Close the session (if connected)
          if (session._connPromise) {
            session.close();
          }

          // Compile HTML template
          const template = require('ejs-compiled!./views/index.ejs');

          // Serve compiled HTML
          res.status(200).send(template({ ROOT }));

          // Dismiss other waiter
          isSent = true;
        }
      };

      // Wait for all queries complete
      session.onceDoneLoading(renderDOM);

      // Max timeout for queries.
      // Fallback to client side querying
      setTimeout(renderDOM, 750);

      return 1;
    });
  });

  // Create http server with express app
  const httpServer = http.createServer(app);

  // Setup a websocket listener
  listen({
    httpServer,
    queryWhitelist: require('./server/queries').default,
    httpPath: ws.path,
    dbHost: db.hostname,
    dbPort: db.port,
    unsafelyAllowAnyQuery: true,
    loggingMode: config.isDev ? 'all' : 'denied',
  });

  // Start the server
  httpServer.listen(port, err => {
    if (err) throw err;
    console.info('\nServer started 🚀  => ', `${host}:${port}`); // eslint-disable-line
    console.info('RethinkDB serving from ', ws.href); // eslint-disable-line
  });
});
