import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SendInfo from 'common/SendInfo';
import dot from '../../../../images/serv-auto-dotlist.svg';
import s from './WorksList.module.css';

const WorksList = ({ worksConfig }) => {
  const { t } = useTranslation();
  return (
    <div className={s.blockWrapper}>
      <h2 className={s.title}>{t('services.auto.workTitle')}:</h2>
      <ul className={s.list}>
        {worksConfig.map(({ text }, index) => (
          <li key={index} className={s.item}>
            <img src={dot} alt="dot"></img>
            <div className={s.text}>{t(text)}</div>
          </li>
        ))}
      </ul>

      <div className={s.sendInfo}>
        <SendInfo
          linkName={t('sendInfo.maintenance')}
          linkPath="/services/maintenance"
          hideLink={false}
        />
      </div>
    </div>
  );
};

WorksList.propTypes = {
  worksConfig: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      head: PropTypes.string,
      text: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};
export default WorksList;
