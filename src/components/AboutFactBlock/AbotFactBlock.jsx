import { useTranslation } from 'react-i18next';

import { useState, useEffect } from 'react';
import SendInfo from 'common/SendInfo';
import AboutFactList from './AboutFactList';
import s from './AboutFactBlock.module.css';
import Container from 'common/Container/Container';
import Trail from 'common/Trail/Trail';

const AbotFactBlock = () => {
  const { t } = useTranslation();

  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <div className={s.aboutFactBlock}>
      <Container>
        <div className={s.taglineAbout}>
          <Trail
            open={isAnimated}
            textStyle="taglineBig"
            heightD={32}
            heightMob={48}
            heightBig={70}
          >
            <p className="tagline">{t('abotFactBlock.tagline')}</p>
          </Trail>
        </div>
        <AboutFactList />

        <div className={s.sendInfo}>
          <SendInfo
            linkName={t('sendInfo.services')}
            linkPath="/services"
            hideLink={false}
          />
        </div>
      </Container>
    </div>
  );
};

export default AbotFactBlock;
