import React, { Component } from 'react';
import { r, QueryRequest } from 'react-rethinkdb';
import Rethinkable, { serverData } from '../../helpers/rethinkable';
import Segment from 'segment/Segment';
import Heading from 'heading/Heading';
import Button from 'button/Button';

/**
 * Turtle details page
 *
 * @return {React.Component}
 */
@Rethinkable
class TurtleDetail extends Component {

  /**
   * Observe method
   * @param  {object} Properties
   * @return {[type]}
   */
  observe(props) {
    // Setup
    const { params } = props;
    const query = r.table('turtles').get(params.id);

    if (!this.serverData) {
      this.serverData = serverData.get(this);
    }

    return {
      turtle: new QueryRequest({
        query,
        changes: _isClient,
        initial: this.serverData.turtle || null,
      }),
    };
  }

  /**
   * Render method
   * @return {Component}
   */
  render() {
    // Get turtle
    const turtle = this.data.turtle.value({ allowStaleQuery: true });

    return (
      <Segment>
        {!turtle ? null : (
          <div>
            <Heading>{turtle.name}</Heading>
            <Button to="/">Go back</Button>
          </div>
        )}
        {serverData.set(this, { turtle })}
      </Segment>
    );
  }
}

export default TurtleDetail;
