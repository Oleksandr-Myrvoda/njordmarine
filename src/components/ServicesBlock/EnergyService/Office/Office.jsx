import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import SendInfo from 'common/SendInfo';
import ListWithDot from '../ListWithDot';
import { officeConfig } from 'data/office';

import s from './Office.module.css';
import Trail from 'common/Trail/Trail';

const Office = () => {
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
        <Trail
          open={isAnimated}
          // textStyle="taglineBig"
          heightD={60}
          heightMob={48}
        >
          <p className={s.title}>{t('office.title')}</p>
        </Trail>
      </div>

      <p className={s.text}>
        {t('office.text1')}
        <span className={s.focus}> “FOCUS Onshore”</span> {t('office.text2')}
      </p>

      <h2 className={s.head}>{t('office.head')}:</h2>

      <ListWithDot config={officeConfig} />

      <div className={s.sendInfo}>
        <SendInfo
          linkName={t('sendInfo.spares')}
          linkPath="/spares"
          hideLink={false}
        />
      </div>
    </div>
  );
};

export default Office;
