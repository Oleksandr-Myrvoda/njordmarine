import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import SendInfo from 'common/SendInfo';
import ServiceList from './ServiceList';
import React, { useState, useEffect, useRef } from 'react';
import { useTrail, a } from '@react-spring/web';
import s from './ServicesBlock.module.css';
import Container from 'common/Container/Container';
import HeadingTitle from 'common/HeadingTitle/HeadingTitle';
import Trail from 'common/Trail/Trail';

const ServicesBlock = () => {
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
        const visibleThreshold = 0.9 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setOpen(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={s.servicesBlock}>
      <Container>
        <div className={s.orderWrapepr}>
          <div className={s.taglineBlock}>
            <p className="headingBlock">{t('servicesBlock.heading')}</p>
            <div className={s.container} ref={headerRef}>
              <Trail
                open={open}
                textStyle="tagline"
                heightD={40}
                heightMob={55}
              >
                <span>{t('servicesBlock.tagline1')}</span>
                <span>{t('servicesBlock.tagline2')}</span>
              </Trail>
            </div>
          </div>

          {isDesktop && (
            <div className={s.sendInfo}>
              <SendInfo hideLink={true} />
            </div>
          )}
        </div>

        <div className={s.serviceListWrapper}>
          <ServiceList />
        </div>
        {!isDesktop && <SendInfo hideLink={true} />}
      </Container>
    </div>
  );
};

export default ServicesBlock;
