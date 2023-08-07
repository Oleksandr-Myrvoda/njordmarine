import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import SendInfo from 'common/SendInfo';
import OptionsBlock from './OptionsBlock';
import quotes from 'images/quotes.svg';
import s from './OnBoard.module.css';
import Trail from 'common/Trail/Trail';

const OnBoard = () => {
  const { t } = useTranslation();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <div className={s.blockWrapper}>
      <div className={s.hero}>
        {/* <div className={s.trailWrapper}> */}
        <Trail
          open={isAnimated}
          // textStyle="taglineBig"
          heightD={60}
          heightMob={48}
        >
          <p className={s.title}>{t('services.energy.onBoard.title')}</p>
        </Trail>
        {/* </div> */}
      </div>

      <div className={s.descrWrapper}>
        <img className={s.quotes} src={quotes} alt="quotes" />

        <p className={s.head}>{t('services.energy.onBoard.head')}</p>
        <p className={s.text}>{t('services.energy.onBoard.text')}</p>
      </div>

      <div className={s.stroke}></div>

      <OptionsBlock />

      <div className={s.sendInfo}>
        <SendInfo
          linkName={t('sendInfo.focus')}
          linkPath="/services/energy/focus"
          hideLink={false}
        />
      </div>
    </div>
  );
};

export default OnBoard;
