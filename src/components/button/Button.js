import { PropTypes } from 'react';
import { Link } from 'react-router';
import s from './Button.css';

/**
 * Button wrapper component
 * @param {Component}
 */
function Button(props) {
  // Extract props
  const { to, children, className } = props;

  // Build classname
  const cls = [className, s.host].join(' ');

  if (to) {
    return <Link {...props} className={cls}>{children}</Link>;
  }

  return <button {...props} className={cls}>{children}</button>;
}

Button.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
