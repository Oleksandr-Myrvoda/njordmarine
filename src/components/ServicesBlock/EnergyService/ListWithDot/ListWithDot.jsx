import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import s from './ListWithDot.module.css';
import dot from 'images/serv-auto-dotlist.svg';

const ListWithDot = ({ config }) => {
  const { t } = useTranslation();
  return (
    <ul className={s.list}>
      {config.map(({ text }, index) => (
        <li key={index} className={s.item}>
          <img src={dot} alt="dot"></img>
          <div className={s.text}>{t(text)}</div>
        </li>
      ))}
    </ul>
  );
};

ListWithDot.propTypes = {};

export default ListWithDot;
