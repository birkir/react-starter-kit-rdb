import { PropTypes } from 'react';
import s from 'Segment.css';

function Segment(props) {
  return (
    <div className={s.host}>
      {props.children}
    </div>
  );
}

Segment.propTypes = {
  children: PropTypes.node,
};

export default Segment;
