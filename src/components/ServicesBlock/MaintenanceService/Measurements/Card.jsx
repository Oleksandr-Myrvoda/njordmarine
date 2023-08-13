import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import s from './Measurements.module.css';

const Card = ({ imgUrl, count, title, text, alt }) => {
  const { t } = useTranslation();
  return (
    <div className={s.cardItem}>
      <img className={s.image} src={imgUrl} alt={t(alt)} />
      <div className={s.titleWrapper}>
        <p className={s.count}>{count}</p>
        <p className={s.title}>{t(title)}</p>
      </div>
      <p className={s.text}>{t(text)}</p>
    </div>
  );
};

Card.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Card;
