import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import s from './OurTeamList.module.css';

const Card = ({ imgUrl, name, position, alt }) => {
  const { t } = useTranslation();
  return (
    <div className={s.item}>
      <img className={s.image} src={imgUrl} alt={alt} />
      <p className={s.name}>{t(name)}</p>
      <p className={s.position}>{t(position)}</p>
    </div>
  );
};

Card.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Card;
