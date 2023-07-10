import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import s from './NavItemFooter.module.css';

const NavItemFooter = ({ name, path }) => {
  const isActive = false;

  const navItemStyles = [s.NavItem];
  isActive && navItemStyles.push(s.NavItemActive);
  return (
    <NavLink
      to={path}
      className={navItemStyles.join(' ')}
      activeClassName={s.NavItemActive}
    >
      <span className={s.itemName}>{name}</span>
    </NavLink>
  );
};

NavItemFooter.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavItemFooter;
