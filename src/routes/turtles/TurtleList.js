import React, { Component } from 'react';
import { Link } from 'react-router';
import { r, QueryRequest } from 'react-rethinkdb';
import Rethinkable, { serverData } from '../../helpers/rethinkable';
import Segment from 'segment/Segment';
import Heading from 'heading/Heading';
import s from './TurtleList.css';

/**
 * Turtle List component
 * @return {Component}
 */
@Rethinkable
class TurtleList extends Component {

  /**
   * Observer method
   * @return {object}
   */
  observe() {
    if (!this.serverData) {
      this.serverData = serverData.get(this);
    }

    return {
      turtles: new QueryRequest({
        query: r.table('turtles'),
        changes: _isClient,
        initial: this.serverData.turtles || null,
      }),
    };
  }

  /**
   * Render method
   * @return {Component}
   */
  render() {
    // Get db value
    const turtles = this.data.turtles.value({ allowStaleQuery: true });
    return (
      <div className={s.cards}>
        <Segment>
          <Heading>List of turtles</Heading>
          <div className={s.list}>
            {turtles ? turtles.map(turtle => (
              <Link to={`/turtle/${turtle.id}`} className={s.item} key={turtle.id}>
                {turtle.name}
              </Link>
            )) : null}
          </div>
        </Segment>
        {serverData.set(this, { turtles })}
      </div>
    );
  }
}

export default TurtleList;
