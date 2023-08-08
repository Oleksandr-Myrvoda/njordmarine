import { useTranslation } from 'react-i18next';
import { ourTeamConfig } from 'data/our-team';
import { useState, useEffect } from 'react';
import OurTeamList from './OurTeamList';
import SendInfo from 'common/SendInfo/SendInfo';
import Container from 'common/Container/Container';
import s from './OurTeamBlock.module.css';
import Trail from 'common/Trail/Trail';

const OurTeamBlock = () => {
  const { t } = useTranslation();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <div className={s.ourTeamBlock}>
      <Container>
        <div className={s.descr}>
          <Trail open={isAnimated} heightD={60} heightMob={32}>
            <h1 className="taglineBig">{t('ourTeamBlock.taglineBig')}</h1>
            <p className={s.description}>{t('ourTeamBlock.text')}</p>
          </Trail>
        </div>

        <OurTeamList ourTeamConfig={ourTeamConfig} />

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

export default OurTeamBlock;
