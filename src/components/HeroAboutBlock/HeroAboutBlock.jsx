import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import cabinet from 'images/hero-bg-about-mob.png';

import s from './HeroAboutBlock.module.css';

const HeroAboutBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  return (
    <div className={s.heroAboutBlock}>
      <div className={s.heroContent}>
        <h1 className="taglineBig">{t('heroAboutBlock.taglineBig')}</h1>
        <h2 className="tagline">{t('heroAboutBlock.tagline')}</h2>
        <p className="text">{t('heroAboutBlock.text')}</p>
        {!isDesktop && <img className={s.img} src={cabinet} alt="cabinet" />}

        <a href="/" className={s.serviceLink}>
          {t('common.brochure')}
        </a>
      </div>
    </div>
  );
};
export default HeroAboutBlock;
