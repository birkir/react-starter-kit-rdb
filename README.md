React Starter Kit - Rethinkdb Isomorphic Edition
================================================

This is a simple starter kit for react application with both server and client side rendering. Server runs all needed rethinkdb queries needed to render the app, outputs them as JSON alogn with rendering the whole app. Client (if JS is available) will then pickup and continue where the server left off.

### Requirements
 * Rethinkdb 2.2 (for server rendering with client changes)
 * Node 5.0+
 * NPM 3.0+

### Installing
Doing a npm install will fetch all required modules and build the server (so you can start it with `npm start` after this command)
```bash
$ npm install
```

### Running

Development
```bash
$ npm run dev
```

Production
```bash
$ npm run build && npm start
```

### Directory Layout

This is very minimal and simple starter kit but can get you quickly going.

```
.
├── /build/                     # The folder for compiled output
├── /src/                       # The source code of the application
│   ├── /components/            # React components
│   ├── /containers/            # App containers
│   ├── /routes/                # Route components + isomorphic routes in index.js
│   ├── /views/                 # Express.js views for index and error pages
│   ├── /server/                # Express.js views for index and error pages
│   │   ├──  /config.js         # Processing of env and urls
│   │   ├──  /routes.js         # Server side routes (you can put server side routes here)
│   │   └──  /queries.js        # Whitelisted rethinkdb queries
│   ├── /client.js              # Client-side startup script
│   └── /server.js              # Server-side startup script
├── /webpack/                   # Webpack configuration files
│   ├── /shared.js              # Shared loaders and plugins for server and client
│   ├── /client.js              # Client configuration
│   └── /server.js              # Server configuration
└── package.json                # The list of 3rd party libraries and utilities
```
