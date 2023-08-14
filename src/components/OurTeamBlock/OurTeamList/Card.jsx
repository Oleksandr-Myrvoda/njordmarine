import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import s from './OurTeamList.module.css';
import Image from 'common/Image/Image';

const Card = ({ imgUrl, name, position, alt }) => {
  const { t } = useTranslation();

  console.log('aor team card');
  return (
    <div className={s.item}>
      <Image className={s.image} src={imgUrl} alt={alt} />
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
