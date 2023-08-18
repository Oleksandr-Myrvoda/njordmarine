import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';

import BtnsDotPagination from 'common/BtnsDotPagination';
import Trail from 'common/Trail';
import Card from './Card';

import arrowRight from 'images/pagi-arrow-right.svg';
import arrowLeft from 'images/pagi-arrow-left.svg';

import s from './Measurements.module.css';
import 'styles/swipeable.css';

const buttonsList = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const Measurements = ({ measurementsConfig: cards }) => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const isDesktopBig = useMediaQuery({ query: '(min-width: 2560px)' });

  const [isAnimated, setIsAnimated] = useState(false);
  const headerRef = useRef(null);

  // ============= Header =============

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;

      if (windowHeight > 800 && !isDesktop) {
        setIsAnimated(true);
      }
    };

    const handleScroll = () => {
      const element = headerRef.current;
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.7 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setIsAnimated(true);
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
  }, [isDesktop]);

  // SWIPER

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(4);
  const [nextIndex, setNextIndex] = useState(1);
  const totalCards = 5;
  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + totalCards) % totalCards);
    setPrevIndex(prev => (prev - 1 + totalCards) % totalCards);
    setNextIndex(prev => (prev - 1 + totalCards) % totalCards);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % totalCards);
    setPrevIndex(prev => (prev + 1) % totalCards);
    setNextIndex(prev => (prev + 1) % totalCards);
  };

  return (
    <div className={s.blockWrapper} ref={headerRef}>
      <Trail open={isAnimated} heightBig={120} heightD={60} heightMob={64}>
        <h2 className={s.tagline}>
          {t('services.meintenance.measurTagline')}:
        </h2>
      </Trail>

      {!isDesktop && (
        <ul className={s.list}>
          {cards.map(({ imgUrl, count, title, text, alt }, index) => (
            <li key={index} className={s.cardItem}>
              <img className={s.image} src={imgUrl} alt={t(alt)} />
              <div className={s.titleWrapper}>
                <p className={s.count}>{count}</p>
                <p className={s.title}>{t(title)}</p>
              </div>
              <p className={s.text}>{t(text)}</p>
            </li>
          ))}
        </ul>
      )}

      {isDesktop && (
        <>
          <div className={s.list}>
            <button
              className={`${s.pagiBtnArrow}
               ${currentIndex === 0 ? s.disabledBtn : ''}`}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <img className={s.pagiBtnArrowImg} src={arrowLeft} alt="left" />
            </button>

            <div className={s.swiperBlock}>
              {/* PREV */}
              <div
                className={`${s.swiperItemPrev} ${
                  currentIndex === 0 ? s.hideCard : ''
                }`}
              >
                <div className={s.cardWindow}>
                  <div
                    className={s.cardsContainer}
                    style={{
                      transform: `translateX(${
                        prevIndex * (isDesktopBig ? -840 : -420)
                      }px)`,
                    }}
                  >
                    {cards.map(({ title, count, imgUrl, text, alt }) => (
                      <div key={imgUrl}>
                        <Card
                          title={title}
                          count={count}
                          imgUrl={imgUrl}
                          text={text}
                          alt={alt}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ACTIVE */}
              <div className={s.swiperItemActive}>
                <div className={s.cardWindow}>
                  <div
                    className={s.cardsContainer}
                    style={{
                      transform: `translateX(${
                        currentIndex * (isDesktopBig ? -840 : -420)
                      }px)`,
                    }}
                  >
                    {cards.map(({ title, count, imgUrl, text, alt }) => (
                      <div key={imgUrl}>
                        <Card
                          title={title}
                          count={count}
                          imgUrl={imgUrl}
                          text={text}
                          alt={alt}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* NEXT */}
              <div
                className={`${s.swiperItemNext} ${
                  currentIndex === 4 ? s.hideCard : ''
                }`}
              >
                <div className={s.cardWindow}>
                  <div
                    className={s.cardsContainer}
                    style={{
                      transform: `translateX(${
                        nextIndex * (isDesktopBig ? -840 : -420)
                      }px)`,
                    }}
                  >
                    {cards.map(({ title, count, imgUrl, text, alt }) => (
                      <div key={imgUrl}>
                        <Card
                          title={title}
                          count={count}
                          imgUrl={imgUrl}
                          text={text}
                          alt={alt}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              className={`${s.pagiBtnArrow}
               ${currentIndex === 4 ? s.disabledBtn : ''}`}
              onClick={handleNext}
              disabled={currentIndex === 4}
            >
              <img className={s.pagiBtnArrowImg} src={arrowRight} alt="right" />
            </button>
          </div>

          <BtnsDotPagination
            buttonsList={buttonsList}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setPrevIndex={setPrevIndex}
            setNextIndex={setNextIndex}
          />
        </>
      )}
    </div>
  );
};

Measurements.propTypes = {
  measurementsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      count: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};
export default Measurements;
