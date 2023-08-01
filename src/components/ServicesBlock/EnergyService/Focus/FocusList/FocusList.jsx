import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import s from './FocusList.module.css';

const FocusList = ({ focusConfig }) => {
  const { t } = useTranslation();
  return (
    <ul className={s.list}>
      {focusConfig.map(({ imgUrl, title, text, alt }, index) => (
        <li className={s.item} key={index}>
          <img className={s.img} src={imgUrl} alt={t(alt)}></img>
          <p className={s.title}>{t(title)}</p>
          <p className={s.text}>{t(text)}</p>
        </li>
      ))}
    </ul>
  );
};

FocusList.propTypes = {};

export default FocusList;
