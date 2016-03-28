import { r } from 'rethinkdb-websocket-server';
import bodyParser from 'body-parser';

const parseBody = bodyParser.urlencoded({ extended: true });

export default function routes(app) {
  /**
   * Accept server side POST of new turtle
   * Push turtle document into store.
   * Then redirect to home.
   */
  app.post('/add', parseBody, (req, res) => {
    r.table('turtles')
    .insert({ name: req.body.name })
    .run(req._rdbConn)
    .then(() => res.redirect('/'))
    .catch(err => res.status(500).send(err));
  });

	/**
	 * Example how to do pure server methods
   * Can be used for external services or api etc.
	 */
  app.get('/turtles.json', (req, res) => {
    // Find all turtles in database
    r.table('turtles')
    .run(req._rdbConn)
    .then(cursor => cursor.toArray())
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
  });
}
