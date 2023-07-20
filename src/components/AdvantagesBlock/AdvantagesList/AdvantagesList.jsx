import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import s from './AdvantagesList.module.css';

const AdvantagesList = ({ advantagesConfig }) => {
  const { t } = useTranslation();
  return (
    <ul className={s.list}>
      {advantagesConfig.map(({ imgUrl, head, text, alt }, index) => (
        <li key={index} className={s.item}>
          <img className={s.image} src={imgUrl} alt={t(alt)} />
          <p className={s.head}>{t(head)}</p>
          <p className={s.descr}>{t(text)}</p>
        </li>
      ))}
    </ul>
  );
};

AdvantagesList.propTypes = {
  advantagesConfig: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      head: PropTypes.string,
      text: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default AdvantagesList;
