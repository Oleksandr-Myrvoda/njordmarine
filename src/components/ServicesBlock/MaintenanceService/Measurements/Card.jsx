import { useTranslation } from 'react-i18next';
import s from './Measurements.module.css';

const Card = ({ imgUrl, count, title, text, alt }) => {
  const { t } = useTranslation();
  return (
    <div className={s.item}>
      <img className={s.image} src={imgUrl} alt={t(alt)} />
      <div className={s.titleWrapper}>
        <p className={s.count}>{count}</p>
        <p className={s.title}>{t(title)}</p>
      </div>
      <p className={s.text}>{t(text)}</p>
    </div>
  );
};

export default Card;
