import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect, useRef } from 'react';
import cabinet from 'images/hero-bg-about-mob.png';

import s from './HeroAboutBlock.module.css';
import Container from 'common/Container/Container';
import Trail from 'common/Trail/Trail';

const HeroAboutBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <div className={s.heroAboutBlock}>
      <Container>
        <div className={s.heroContent}>
          <div className={s.heroWrapper}>
            <Trail
              open={isAnimated}
              textStyle="taglineBig"
              heightD={80}
              heightMob={48}
            >
              <h1 className="taglineBig">{t('heroAboutBlock.taglineBig')}</h1>
              <h2 className="tagline">{t('heroAboutBlock.tagline')}</h2>
            </Trail>
            <p className={s.description}>{t('heroAboutBlock.text')}</p>
          </div>
          {!isDesktop && <img className={s.img} src={cabinet} alt="cabinet" />}

          <a href="/" className={s.serviceLink}>
            {t('common.brochure')}
          </a>
        </div>
      </Container>
    </div>
  );
};
export default HeroAboutBlock;
