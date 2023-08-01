import { Redirect, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavItem from 'components/NaviBlock/NavItem';
import engine from 'images/spares-engine.svg';
import lifebuoy from 'images/spares-lifebuoy.svg';
import wheel from 'images/spares-steering-wheel.svg';
import s from './NaviBlock.module.css';

const NaviBlock = ({ navMenu }) => {
  const { imgUrl, name, alt, to } = navMenu;
  // const { name01, name02, name03 } = navMenu;

  const match = useRouteMatch();

  return (
    <div className={s.nav}>
      <NavItem
        name={name}
        path={`${match.url}/${to}`}
        imgUrl={engine}
        alt={alt}
      />
      <NavItem
        name={name}
        path={`${match.url}/${to}`}
        imgUrl={lifebuoy}
        alt={alt}
      />
      <NavItem
        name={name}
        path={`${match.url}/${to}`}
        imgUrl={wheel}
        alt={alt}
      />
    </div>
  );
};

// NaviBlock.propTypes = {
//   name01: PropTypes.string.isRequired,
//   name02: PropTypes.string.isRequired,
//   name03: PropTypes.string.isRequired,
// };

export default NaviBlock;
