import { Component, PropTypes } from 'react';
import s from './Input.css';

/**
 * Input container
 */
class Input extends Component {

  /**
   * Set initial state
   * @param  {...array} Array of arguments
   * @return {void}
   */
  constructor(...args) {
    super(...args);

    // Set state as props value
    this.state = {
      value: this.props.value,
    };
  }

  /**
   * Fired when input text changes
   * @param  {Event} Proxied event
   * @return {void}
   */
  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  /**
   * Render method
   * @return {Component}
   */
  render() {
    // Bind onChange to class
    const onChange = this.onChange.bind(this);

    // Build className
    const className = [this.props.className, s.host].join(' ');

    return (
      <input
        {...this.props}
        value={this.state.value}
        onChange={onChange}
        className={className}
      />
    );
  }
}

Input.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
