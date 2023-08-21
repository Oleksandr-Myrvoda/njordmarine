import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import React, { useState, useEffect } from 'react';
import { useTrail, a } from '@react-spring/web';
import ship from 'images/hero-bg-mob.png';
import SendInfo from 'common/SendInfo';
import Container from 'common/Container/Container';
import CounterAnimation from 'common/CounterAnimation/CounterAnimation';
import s from './HeroBlock.module.css';
import Trail from 'common/Trail/Trail';

const HeroBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setOpen(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <div className={s.heroBlock}>
      <Container>
        <div className={s.heroContent}>
          <div className={s.heroWrapper}>
            <div className={s.head}>{t('heroBlock.head')}</div>
            <div className={s.taglineBig}>
              <div className={s.container}>
                <Trail
                  open={open}
                  textStyle="taglineBig"
                  heightMob={32}
                  heightD={54}
                  heightBig={100}
                >
                  <span>{t('heroBlock.taglineBig1')}</span>
                  <span>{t('heroBlock.taglineBig2')}</span>
                  <span>{t('heroBlock.taglineBig3')}</span>
                </Trail>
              </div>
            </div>

            <p className={s.description}>{t('heroBlock.description')}</p>
          </div>

          {!isDesktop && <img src={ship} alt="ship" />}

          <SendInfo
            linkName={t('heroBlock.sendInfo')}
            linkPath="/services"
            hideLink={false}
          />

          <div className={s.nav}></div>
          <ul className={s.list}>
            <li className={s.listItem}>
              <div className={s.topLine}>
                <div className={s.countLine1}>
                  <CounterAnimation endValue="800" />
                </div>
                <p className={s.top}>{t('heroBlock.top1')}</p>
              </div>
              <p className={s.bot}>{t('heroBlock.bot1')}</p>
            </li>
            <li className={`${s.listItem} ${!isDesktop && s.listItem2}`}>
              <div className={s.topLine}>
                <div className={s.countLine2}>
                  <CounterAnimation endValue="5" />
                </div>
                <p className={s.top}>{t('heroBlock.top2')}</p>
              </div>
              <p className={s.bot}>{t('heroBlock.bot2')}</p>
            </li>
            <li className={s.listItem}>
              <div className={s.topLine}>
                <div className={s.countLine3}>
                  <CounterAnimation endValue="20" />{' '}
                </div>
              </div>
              <p className={s.bot}>{t('heroBlock.bot3')}</p>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};
export default HeroBlock;
