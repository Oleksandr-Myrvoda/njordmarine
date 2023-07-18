import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import bg from 'images/serv-auto-ship.png';
import bgMob from 'images/serv-auto-ship-mob.png';
import s from './Scheme.module.css';

const Scheme = ({ schemeConfig }) => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  return (
    <div className={s.blockWrapper}>
      <h2 className={s.tagline}>{t('services.auto.schemeTagline')}:</h2>
      <div className={s.listWrapper}>
        <div>
          <img src={isDesktop ? bg : bgMob} alt="ship" />
        </div>
        <ul className={s.list}>
          {schemeConfig.map(({ imgUrl, count, text, alt }, index) => (
            <li key={index} className={s.item}>
              <img className={s.image} src={imgUrl} alt={alt} />
              <div>
                <p className={s.count}>{count}</p>
                <p className={s.descr}>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Scheme.propTypes = {
  schemeConfig: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      count: PropTypes.string,
      text: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default Scheme;
