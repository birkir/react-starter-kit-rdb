import { r, RP } from 'rethinkdb-websocket-server';
import config from './config';

// Strict queries to database
const { dbName } = config;
const changes = { includeStates: true, includeInitial: true };
const queries = [];

/**
 * Add query to whitelist as hybrid
 * @param  {r}        Rethinkdb query
 * @param  {function} Validation function
 * @param  {Boolean}  Include changes
 * @return {void}
 */
const addQuery = (q, v, c = true) => {
  const vfn = (typeof v === 'function') ? v : () => true;
  if (c) {
    queries.push(q.changes(changes).opt('db', dbName).validate(vfn));
  }
  queries.push(q.opt('db', dbName).validate(vfn));
};


// Query turtles
// -----------------------------------
addQuery(
  r.table('turtles')
);

// Query turtles by ID
// -----------------------------------
addQuery(r.table('turtles').get(RP.ref('turtleId')));


// Insert turtle document
// -----------------------------------
addQuery(r.table('turtles').insert({ name: RP.ref('name') }), refs => {
  const { name } = refs;
  // Only allow string turtles
  if (typeof name !== 'string') return false;
  // Disallow turtles named 'Ninja'
  if (name === 'Ninja') return false;
  // Otherwise allow turtle
  return true;
}, false);

export default queries;
