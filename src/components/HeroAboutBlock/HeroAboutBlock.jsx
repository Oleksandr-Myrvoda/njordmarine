import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import cabinet from 'images/hero-bg-about-mob.png';

import s from './HeroAboutBlock.module.css';
import Container from 'common/Container/Container';

const HeroAboutBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  return (
    <div className={s.heroAboutBlock}>
      <Container>
        <div className={s.heroContent}>
          <div className={s.heroWrapper}>
            <h1 className="taglineBig">{t('heroAboutBlock.taglineBig')}</h1>
            <h2 className="tagline">{t('heroAboutBlock.tagline')}</h2>
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
