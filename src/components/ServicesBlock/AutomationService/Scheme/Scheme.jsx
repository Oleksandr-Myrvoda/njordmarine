import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import bg from 'images/serv-auto-ship.svg';
import bgMob from 'images/serv-auto-ship-mob.svg';
import Trail from 'common/Trail';
import panel from 'images/serv-auto-panel.svg';
import doc from 'images/serv-auto-doc.svg';
import bell from 'images/serv-auto-bell.svg';
import raports from 'images/serv-auto-raports.svg';
import s from './Scheme.module.css';

const Scheme = ({ schemeConfig }) => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [isAnimated, setIsAnimated] = useState(false);

  const [isAnimated1, setIsAnimated1] = useState(false);
  const [isAnimated2, setIsAnimated2] = useState(false);
  const [isAnimated3, setIsAnimated3] = useState(false);
  const [isAnimated4, setIsAnimated4] = useState(false);
  const itemRef1 = useRef(null);
  const itemRef2 = useRef(null);
  const itemRef3 = useRef(null);
  const itemRef4 = useRef(null);

  // ============= Header =============
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, []);

  // =============== List ================
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;

      if (windowHeight > 800 && !isDesktop) {
        setIsAnimated1(true);
      }
      if (windowHeight > 1000 && isDesktop) {
        setIsAnimated1(true);
        setIsAnimated2(true);
        setIsAnimated3(true);
        setIsAnimated4(true);
      }
    };

    const handleScroll = () => {
      const element1 = itemRef1.current;
      const element2 = itemRef2.current;
      const element3 = itemRef3.current;
      const element4 = itemRef4.current;

      if (element1) {
        const elementPosition = element1.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.9 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setIsAnimated1(true);
        }
      }
      if (element2) {
        const elementPosition = element2.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.9 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setIsAnimated2(true);
        }
      }
      if (element3) {
        const elementPosition = element3.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.9 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setIsAnimated3(true);
        }
      }
      if (element4) {
        const elementPosition = element4.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.9 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setIsAnimated4(true);
        }
      }
    };

    handleResize();

    // Добавляем обработчик события изменения размера окна
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={s.blockWrapper}>
      <Trail
        open={isAnimated}
        // textStyle="taglineBig"
        heightD={60}
        heightMob={48}
      >
        <h2 className={s.tagline}>{t('services.auto.schemeTagline')}:</h2>
      </Trail>
      <div className={s.listWrapper}>
        <div>
          <img className={s.schemeBG} src={isDesktop ? bg : bgMob} alt="ship" />
        </div>

        <ul className={s.list}>
          <div className={s.stroke}></div>
          <li ref={itemRef1}>
            <div
              className={`${s.item} ${isAnimated1 ? s.animatedItem : ''}
             `}
            >
              <img className={s.image} src={panel} alt={t('scheme.alt1')} />
              <div>
                <p className={s.count}>01.</p>
                <p className={s.descr}>{t('scheme.text1')}</p>
              </div>
            </div>
          </li>
          <li ref={itemRef2}>
            <div
              className={`${s.item} ${isAnimated2 ? s.animatedItem : ''}
             `}
            >
              <img className={s.image} src={doc} alt={t('scheme.alt2')} />
              <div>
                <p className={s.count}>02.</p>
                <p className={s.descr}>{t('scheme.text2')}</p>
              </div>
            </div>
          </li>
          <li ref={itemRef3}>
            <div
              className={`${s.item} ${isAnimated3 ? s.animatedItem : ''}
             `}
            >
              <img className={s.image} src={bell} alt={t('scheme.alt3')} />
              <div>
                <p className={s.count}>03.</p>
                <p className={s.descr}>{t('scheme.text3')}</p>
              </div>
            </div>
          </li>
          <li ref={itemRef4}>
            <div
              className={`${s.item} ${isAnimated4 ? s.animatedItem : ''}
             `}
            >
              <img className={s.image} src={raports} alt={t('scheme.alt4')} />
              <div>
                <p className={s.count}>04.</p>
                <p className={s.descr}>{t('scheme.text4')}</p>
              </div>
            </div>
          </li>
        </ul>
        {/* <ul className={s.list}>
          {schemeConfig.map(({ imgUrl, count, text, alt }, index) => (
            <li key={index} className={s.item}>
              <img className={s.image} src={imgUrl} alt={t(alt)} />
              <div>
                <p className={s.count}>{count}</p>
                <p className={s.descr}>{t(text)}</p>
              </div>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

Scheme.propTypes = {
  schemeConfig: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      count: PropTypes.string,
      text: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default Scheme;
