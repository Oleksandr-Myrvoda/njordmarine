import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import { useLangContext } from 'context/LangProvider';
import { useSetOtherError } from 'context/ErrorProvider';
import { getBrochureApi } from 'services/api';
import { getTermsApi } from 'services/api';
import BigButton from 'common/BigButton';
import globe from 'images/globe.svg';
import globeMob from 'images/globe-mob.svg';
import airplaine from 'images/airplane.svg';
// import globe from 'images/globe.png';
// import globeMob from 'images/globe-mob.png';
import s from './GeoBlock.module.css';
import Trail from 'common/Trail/Trail';

import { motion } from 'framer-motion';
import Image from 'common/Image/Image';

const GeoBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const setOtherError = useSetOtherError();
  const history = useHistory();
  const { lang } = useLangContext();
  const [fileUrl, setFileUrl] = useState({ ru: '', en: '' });
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    getTermsApi()
      .then(termRefs => {
        const { id, ...rest } = termRefs;
        setFileUrl(rest);
      })
      .catch(error => {
        setOtherError(error.response.data);
        console.log('setOtherErorr(error.response.data)');
        console.dir(error);
      });
  }, [setOtherError]);

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
  // BROCHURE
  // useEffect(() => {
  //   getBrochureApi()
  //     .then(refs => {
  //       const { id, ...rest } = refs;
  //       setFileUrl(rest);
  //     })
  //     .catch(error => {
  //       setOtherError(error.response.data);
  //       console.log('setOtherErorr(error.response.data)');
  //       console.dir(error);
  //     });
  // }, [setOtherError]);

  const globeImage = isDesktop ? globe : globeMob;

  const toContacts = () => {
    history.push('/contacts');
  };

  //DOWNLOAD TERMS
  const handleDownload = () => {
    const anchor = document.createElement('a');
    anchor.href = fileUrl[lang];
    anchor.download = true;
    anchor.target = '_blank';
    anchor.rel = 'noreferrer';
    anchor.click();
  };
  // +++++++++++++++++++++++++++++++++++++++++++++
  const [satellitePosition, setSatellitePosition] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const orbitRadius = !isDesktop ? 150 : 264; // Радиус орбиты спутника
    const orbitSpeed = 0.03; // Скорость движения спутника по орбите
    let angle = 0;

    const updateSatellitePosition = () => {
      angle += orbitSpeed;
      const x = orbitRadius * Math.cos(angle) + orbitRadius;
      const y = orbitRadius * Math.sin(angle) + orbitRadius;
      setSatellitePosition({ x, y });
    };

    const intervalId = setInterval(updateSatellitePosition, 30);

    return () => clearInterval(intervalId);
  }, [isDesktop]);

  // airplane diagonal +++++++++++++++++++++++++++++++++++++++++++++
  const [initialPosition, setInitialPosition] = useState({
    x: !isDesktop ? 75 : 100,
    y: !isDesktop ? -75 : -100,
  });
  const [animatePosition, setAnimatePosition] = useState({
    x: !isDesktop ? 275 : 425,
    y: !isDesktop ? -275 : -425,
  });

  useEffect(() => {
    setInitialPosition({
      x: !isDesktop ? 75 : 100,
      y: !isDesktop ? -75 : -100,
    });
    setAnimatePosition({
      x: !isDesktop ? 275 : 425,
      y: !isDesktop ? -275 : -425,
    });
  }, [isDesktop]);

  return (
    <div className={s.geoBlock}>
      <div className={s.description}>
        <div className={s.descriptionInside} ref={headerRef}>
          <p className="headingBlock">{t('geoBlock.heading')}</p>
          <Trail open={open} textStyle="tagline" heightD={60} heightMob={50}>
            <span>{t('geoBlock.tagline')}</span>
          </Trail>
          {/* <h2 className="tagline">{t('geoBlock.tagline')}</h2> */}
          <p className={s.text}>{t('geoBlock.text')}</p>
        </div>
        <div className={s.earthContainer}>
          <Image className={s.earthImage} src={globeImage} alt="globe" />

          {/* <div className={s.airplaneWrapper}> */}
          <div
            className={s.airplane}
            style={{ top: satellitePosition.y, left: satellitePosition.x }}
          />
          {/* </div> */}

          {/* <div className={s.airplaneWtapper2}> */}
          <motion.div
            className={s.airplane2}
            initial={initialPosition}
            // initial={{ x: !isDesktop ? 75 : 100, y: !isDesktop ? -75 : -100 }}
            animate={animatePosition}
            // animate={{
            //   x: !isDesktop ? 275 : 425,
            //   y: !isDesktop ? -275 : -425,
            // }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'loop' }}
          />
          {/* </div> */}
        </div>
      </div>
      <div className={s.contactUs}>
        <p className="taglineBig">{t('geoBlock.taglineBig')}</p>
        <p className={s.text}>{t('geoBlock.text2')}</p>
        <BigButton onClick={toContacts} text={t('geoBlock.bigButtonText')} />

        <button className={s.downloadButton} onClick={handleDownload}>
          <div className={s.termsLink}>{t('geoBlock.bigButtonLink')}</div>
        </button>
      </div>
    </div>
  );
};

export default GeoBlock;
