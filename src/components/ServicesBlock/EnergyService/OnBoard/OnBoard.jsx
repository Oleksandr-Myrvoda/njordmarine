import { useTranslation } from 'react-i18next';
import SendInfo from 'common/SendInfo';
import OptionsBlock from './OptionsBlock';
import quotes from 'images/quotes.svg';
import s from './OnBoard.module.css';

const OnBoard = () => {
  const { t } = useTranslation();
  return (
    <div className={s.blockWrapper}>
      <div className={s.hero}>
        <p className={s.title}>{t('services.energy.onBoard.title')}</p>
      </div>

      <div className={s.descrWrapper}>
        <img className={s.quotes} src={quotes} alt="quotes" />

        <p className={s.head}>{t('services.energy.onBoard.head')}</p>
        <p className={s.text}>{t('services.energy.onBoard.text')}</p>
      </div>

      <div className={s.stroke}></div>

      <OptionsBlock />

      <SendInfo
        linkName={t('sendInfo.focus')}
        linkPath="/services/energy/focus"
        hideLink={false}
      />
    </div>
  );
};

export default OnBoard;
