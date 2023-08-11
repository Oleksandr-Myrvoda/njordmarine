import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import s from './NavItemFooter.module.css';

const NavItemFooter = ({ name, path, scrollToTop }) => {
  return (
    <NavLink to={path} className={s.navItem} onClick={scrollToTop}>
      <span className={s.itemName}>{name}</span>
    </NavLink>
  );
};

NavItemFooter.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavItemFooter;
