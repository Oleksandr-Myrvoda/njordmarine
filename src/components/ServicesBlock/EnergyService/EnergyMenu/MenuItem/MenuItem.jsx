import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import s from './MenuItem.module.css';

const MenuItem = ({ name, to }) => {
  const match = useRouteMatch();
  // console.log(match);
  const isActive = false;

  const navItemStyles = [s.NavItem];
  isActive && navItemStyles.push(s.NavItemActive);

  return (
    <NavLink
      // to={to}
      to={`${match.url}/${to}`}
      className={navItemStyles.join(' ')}
      activeClassName={s.NavItemActive}
      exact
    >
      <span className={s.itemName}>{name}</span>
    </NavLink>
  );
};

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default MenuItem;
