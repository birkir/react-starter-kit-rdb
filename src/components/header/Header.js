import { PropTypes } from 'react';
import { Link } from 'react-router';
import s from 'Header.css';

/**
 * Header component
 * @return {Component}
 */
function Header() {
  return (
    <div className={s.host}>
      <div className={s.logo}>Starter Kit</div>
      <div style={{ flex: 1 }}></div>
      <div className={s.actions}>
        <Link to="/add" className={s.button}>Add Turtle</Link>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default Header;
