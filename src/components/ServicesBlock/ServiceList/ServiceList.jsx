import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Paper from 'common/Paper';
import s from './ServiceList.module.css';

const ServiceList = ({ serviceConfig }) => {
  return (
    <ul className={s.list}>
      {serviceConfig.map(({ imgUrl, text, alt, to }, index) => (
        <li key={index}>
          <Paper>
            <NavLink to={to}>
              <div className={s.item}>
                <img className={s.image} src={imgUrl} alt={alt} />
                <p className={s.descr}>{text}</p>
                <p className={s.link}>Подробнее</p>
              </div>
            </NavLink>
          </Paper>
        </li>
      ))}
    </ul>
  );
};

ServiceList.propTypes = {
  serviceConfig: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      text: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default ServiceList;
