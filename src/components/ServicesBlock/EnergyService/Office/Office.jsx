import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import SendInfo from 'common/SendInfo';
import ListWithDot from '../ListWithDot';
import { officeConfig } from 'data/office';

import s from './Office.module.css';
import Trail from 'common/Trail/Trail';

const Office = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [isAnimated, setIsAnimated] = useState(false);

  const [isAnimated1, setIsAnimated1] = useState(false);
  const headerRef1 = useRef(null);

  // ============= Header H2 =============
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  // ============= Header H2 =============

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;

      const animationTimer = setTimeout(() => {
        if (windowHeight > 800 && !isDesktop) {
          setIsAnimated1(true);
        }
      }, 500);

      return () => clearTimeout(animationTimer);
    };

    const handleScroll = () => {
      const element = headerRef1.current;
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.8 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setIsAnimated1(true);
        }
      }
    };

    handleResize();

    // Добавляем обработчик события изменения размера окна
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDesktop]);

  return (
    <div className={s.blockWrapper}>
      <div className={s.hero}>
        <Trail open={isAnimated} heightBig={78} heightD={40} heightMob={48}>
          <p className={s.title}>{t('office.title')}</p>
        </Trail>
      </div>

      <div className={s.text}>
        {t('office.text1')}
        <span className={s.focus}> “FOCUS Onshore”</span> {t('office.text2')}
      </div>

      <div className={s.trailWrapper} ref={headerRef1}>
        <Trail open={isAnimated1} heightBig={120} heightD={80} heightMob={80}>
          <h2 className={s.head}>{t('office.head')}:</h2>
        </Trail>
      </div>

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
