import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './NavItem.module.css';

const NavItem = ({ name, path }) => {
  const location = useLocation();
  const isActive = false;

  const navItemStyles = [s.NavItem];
  isActive && navItemStyles.push(s.NavItemActive);
  console.log('location', location);
  console.log('path', path);
  return (
    <NavLink
      to={path}
      // to={{
      //   pathname: { path },
      //   state: {
      //     from: location,
      //   },
      // }}
      className={navItemStyles.join(' ')}
      activeClassName={s.NavItemActive}
    >
      <div className={s.itemName}>{name}</div>
    </NavLink>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavItem;
