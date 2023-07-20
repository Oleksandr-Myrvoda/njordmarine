import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import s from './Measurements.module.css';

const Measurements = ({ measurementsConfig }) => {
  const { t } = useTranslation();
  return (
    <div className={s.blockWrapper}>
      <h2 className={s.tagline}>{t('services.meintenance.measurTagline')}:</h2>

      <ul className={s.list}>
        {measurementsConfig.map(
          ({ imgUrl, count, title, text, alt }, index) => (
            <li key={index} className={s.item}>
              <img className={s.image} src={imgUrl} alt={t(alt)} />
              <div className={s.titleWrapper}>
                <p className={s.count}>{count}</p>
                <p className={s.title}>{t(title)}</p>
              </div>
              <p className={s.text}>{t(text)}</p>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

Measurements.propTypes = {
  measurementsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      count: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};
export default Measurements;
