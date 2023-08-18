import { focusConfig, focusOptionsConfig } from 'data/focus';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import SendInfo from 'common/SendInfo';
import FocusList from './FocusList';
import ListWithDot from '../ListWithDot';
import s from './Focus.module.css';
import Trail from 'common/Trail';

const Focus = () => {
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
        <Trail open={isAnimated} heightBig={78} heightD={40} heightMob={100}>
          <p className={s.title}>{t('focus.title')}</p>
        </Trail>
      </div>

      <p className={s.text}>
        <span className={s.span}>{t('focus.textBold')} </span> -{' '}
        {t('focus.text')}.
      </p>
      <div className={s.headblock}>
        <h1 className={s.head}>{t('focus.head')}</h1>
        <p className={s.text}>{t('focus.text2')}</p>
      </div>

      <FocusList focusConfig={focusConfig} />

      <h2 className={s.titleBottom}>{t('focus.titleBottom')}</h2>

      <ListWithDot config={focusOptionsConfig} />

      <div className={s.sendInfo}>
        <SendInfo
          linkName={t('sendInfo.office')}
          linkPath="/services/energy/office"
          hideLink={false}
        />
      </div>
    </div>
  );
};

export default Focus;
