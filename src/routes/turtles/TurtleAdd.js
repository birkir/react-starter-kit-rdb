import { Component, PropTypes } from 'react';
import { r } from 'react-rethinkdb';
import Input from 'input/Input';
import Heading from 'heading/Heading';
import Segment from 'segment/Segment';
import Button from 'button/Button';
import s from './TurtleAdd.css';

/**
 * Add turtle (Route Component)
 */
class TurtleAdd extends Component {

  /**
   * Fired when form is submitted
   * @param  {Event}
   * @return {bool}
   */
  onSubmit(e) {
    // Prevent form to submit
    e.preventDefault();

    // Get input name value
    const name = this.refs.inputName.state.value;

    // Setup query
    const query = r.table('turtles').insert({
      name,
    });

    // Run query through subscription manager
    this.context.session._subscriptionManager.runQuery(query);

    // Then redirect to home
    this.context.router.push('/');

    return false;
  }

  /**
   * Render method
   * @return {Component}
   */
  render() {
    // Bind onSubmit to class
    const onSubmit = this.onSubmit.bind(this);

    return (
      <Segment>
        <Heading>Add new turtle</Heading>
        <form method="post" onSubmit={onSubmit}>
          <div className={s.control}>
            <Input
              name="name"
              className={s.input}
              placeholder="Type a turtle name..."
              ref="inputName"
            />
          </div>
          <div className={s.control}>
            <Button type="submit">Add turtle</Button>
          </div>
        </form>
      </Segment>
    );
  }
}

TurtleAdd.contextTypes = {
  session: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default TurtleAdd;
