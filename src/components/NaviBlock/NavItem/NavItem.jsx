import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import s from './NavItem.module.css';

const NavItem = ({ imgUrl, alt, name, path }) => {
  const isActive = false;

  const navItemStyles = [s.NavItem];
  isActive && navItemStyles.push(s.NavItemActive);

  return (
    <NavLink
      to={path}
      className={navItemStyles.join(' ')}
      activeClassName={s.NavItemActive}
    >
      <img className={s.img} src={imgUrl} alt={alt} />
      <span className={s.itemName}>{name}</span>
    </NavLink>
  );
};

NavItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavItem;
