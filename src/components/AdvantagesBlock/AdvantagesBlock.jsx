import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import React, { useState, useEffect, useRef } from 'react';
import SendInfo from 'common/SendInfo';
import AdvantagesList from './AdvantagesList';
import { advantagesConfig } from 'data/advantages';
import s from './AdvantagesBlock.module.css';
import Container from 'common/Container/Container';
import Trail from 'common/Trail/Trail';

const AdvantagesBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = headerRef.current;
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.7 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setOpen(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={s.advantagesBlock}>
      <Container>
        <div className={s.textBlock} ref={headerRef}>
          <p className="headingBlock">{t('advantagesBlock.heading')}</p>
          <Trail open={open} textStyle="tagline" heightD={40} heightMob={20}>
            <span>{t('advantagesBlock.tagline')}</span>
          </Trail>
          {/* <h2 className="tagline">{t('advantagesBlock.tagline')}</h2> */}
        </div>
        <AdvantagesList advantagesConfig={advantagesConfig} />
      </Container>

      {!isDesktop && <SendInfo linkName="" linkPath="" hideLink={true} />}
    </div>
  );
};

export default AdvantagesBlock;
