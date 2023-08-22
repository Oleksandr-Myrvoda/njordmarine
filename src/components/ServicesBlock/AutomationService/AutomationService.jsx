import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Scheme from './Scheme';
import WorksList from './WorksList';

import { worksConfig } from 'data/works';

import s from './AutomationService.module.css';
import Trail from 'common/Trail/Trail';

const AutomationService = () => {
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
          <p className={s.title}>{t('services.auto.title')}</p>
        </Trail>
      </div>

      <div>
        <p className={s.text}>
          <span className={s.textBold}>{t('services.auto.textBold')}</span>
          {t('services.auto.text')}
        </p>
      </div>

      <div className={s.blockContent}>
        <Scheme />
        <WorksList worksConfig={worksConfig} />
      </div>
    </div>
  );
};

export default AutomationService;
