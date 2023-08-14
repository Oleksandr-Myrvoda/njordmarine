import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import s from './MenuItem.module.css';
import Image from 'common/Image/Image';

const MenuItem = ({ imgUrl, name, alt, to }) => {
  const match = useRouteMatch();
  const [isAnimated, setIsAnimated] = useState(false);
  const isActive = false;

  const navItemStyles = [s.NavItem];
  isActive && navItemStyles.push(s.NavItemActive);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // const itemRef = useRef(null);
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <NavLink
      onClick={scrollToTop}
      to={`${match.url}/${to}`}
      className={navItemStyles.join(' ')}
      activeClassName={s.NavItemActive}
    >
      <div
        className={`${s.item} ${isAnimated ? s.animatedItem : ''} 
       `}
      >
        <Image className={s.image} src={imgUrl} alt={alt} />
        <span className={s.itemName}>{name}</span>
      </div>
    </NavLink>
  );
};

MenuItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default MenuItem;
