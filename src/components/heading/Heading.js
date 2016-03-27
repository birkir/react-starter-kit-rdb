import { PropTypes } from 'react';
import s from './Heading.css';

function Heading(props) {
  return (
    <div className={s.host}>{props.children}</div>
  );
}

Heading.propTypes = {
  children: PropTypes.node,
};

export default Heading;
