import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import s from './ServiceListMenu.module.css';

const ServiceListMenu = ({ menuListConfig }) => {
  return (
    <ul className={s.nav}>
      {menuListConfig.map(({ imgUrl, name, alt, to }, index) => (
        <li key={index}>
          <MenuItem imgUrl={imgUrl} name={name} alt={alt} to={to} />
        </li>
      ))}
    </ul>
  );
};

ServiceListMenu.propTypes = {
  menuListConfig: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      name: PropTypes.string,
      to: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default ServiceListMenu;
