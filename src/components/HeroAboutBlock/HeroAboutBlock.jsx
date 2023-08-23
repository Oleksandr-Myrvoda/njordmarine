import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect, useRef } from 'react';
import { useLangContext } from 'context/LangProvider';
import { useSetOtherError } from 'context/ErrorProvider';
import { getBrochureApi } from 'services/api';
import cabinet from 'images/hero-bg-about-mob.png';

import s from './HeroAboutBlock.module.css';
import Container from 'common/Container/Container';
import Trail from 'common/Trail/Trail';

const HeroAboutBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [isAnimated, setIsAnimated] = useState(false);
  const { lang } = useLangContext();
  const setOtherError = useSetOtherError();
  const [fileUrl, setFileUrl] = useState({ ru: '', en: '' });

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  useEffect(() => {
    getBrochureApi()
      .then(refs => {
        const { id, ...rest } = refs;
        setFileUrl(rest);
      })
      .catch(error => {
        setOtherError(error.response.data);
        console.log('setOtherErorr(error.response.data)');
        console.dir(error);
      });
  }, [setOtherError]);

  const handleDownload = () => {
    const anchor = document.createElement('a');
    anchor.href = fileUrl[lang];
    anchor.download = true;
    anchor.target = '_blank';
    anchor.rel = 'noreferrer';
    anchor.click();
  };

  return (
    <div className={s.heroAboutBlock}>
      <Container>
        <div className={s.heroContent}>
          <div className={s.heroWrapper}>
            <Trail
              open={isAnimated}
              heightBig={300}
              heightD={110}
              heightMob={48}
            >
              <h1 className="taglineBig">{t('heroAboutBlock.taglineBig')}</h1>
            </Trail>
            <Trail
              open={isAnimated}
              heightBig={108}
              heightD={48}
              heightMob={28}
            >
              <h2 className="tagline">{t('heroAboutBlock.tagline')}</h2>
            </Trail>
            <p className={s.description}>{t('heroAboutBlock.text')}</p>
          </div>
          {!isDesktop && <img className={s.img} src={cabinet} alt="cabinet" />}

          <button className={s.downloadButton} onClick={handleDownload}>
            <div className={s.link}>{t('common.brochureBtn')}</div>
          </button>
        </div>
      </Container>
    </div>
  );
};
export default HeroAboutBlock;
