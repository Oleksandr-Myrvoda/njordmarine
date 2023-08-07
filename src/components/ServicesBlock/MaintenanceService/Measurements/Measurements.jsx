import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import BtnsDotPagination from 'common/BtnsDotPagination';
import Card from './Card';

import arrowRight from 'images/pagi-arrow-right.svg';
import arrowLeft from 'images/pagi-arrow-left.svg';

import s from './Measurements.module.css';
import Trail from 'common/Trail/Trail';

const buttonsList = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const Measurements = ({ measurementsConfig: cards }) => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [currentPage, setCurrentPage] = useState(0);
  const [prevCurrentPage, setPrevCurrentPage] = useState(4);
  const [nextCurrentPage, setNextCurrentPage] = useState(1);

  const [isAnimated, setIsAnimated] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    currentPage === 0
      ? setPrevCurrentPage(4)
      : setPrevCurrentPage(currentPage - 1);

    currentPage === 4
      ? setNextCurrentPage(0)
      : setNextCurrentPage(currentPage + 1);
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, cards.length - 1));
    setPrevCurrentPage(prevPage => Math.min(prevPage + 1, cards.length - 1));
    setNextCurrentPage(prevPage => Math.min(prevPage + 1, cards.length - 1));
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
    setPrevCurrentPage(prevPage => Math.max(prevPage - 1, 0));
    setNextCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

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

  return (
    <div className={s.blockWrapper} ref={headerRef}>
      <Trail
        open={isAnimated}
        // textStyle="taglineBig"
        heightD={60}
        heightMob={64}
      >
        <h2 className={s.tagline}>
          {t('services.meintenance.measurTagline')}:
        </h2>
      </Trail>

      {!isDesktop && (
        <ul className={s.list}>
          {cards.map(({ imgUrl, count, title, text, alt }, index) => (
            <li key={index} className={s.item}>
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
              className={s.pagiBtnArrow}
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              <img src={arrowLeft} alt="left" />
            </button>

            <div className={s.prevCard}>
              <Card
                title={cards[prevCurrentPage].title}
                count={cards[prevCurrentPage].count}
                imgUrl={cards[prevCurrentPage].imgUrl}
                text={cards[prevCurrentPage].text}
                alt={cards[prevCurrentPage].alt}
              />
            </div>

            <div className={s.currentCard}>
              <Card
                title={cards[currentPage].title}
                count={cards[currentPage].count}
                imgUrl={cards[currentPage].imgUrl}
                text={cards[currentPage].text}
                alt={cards[currentPage].alt}
              />
            </div>

            <div className={s.nextCard}>
              <Card
                title={cards[nextCurrentPage].title}
                count={cards[nextCurrentPage].count}
                imgUrl={cards[nextCurrentPage].imgUrl}
                text={cards[nextCurrentPage].text}
                alt={cards[nextCurrentPage].alt}
              />
            </div>
            <button
              className={s.pagiBtnArrow}
              onClick={nextPage}
              disabled={currentPage === cards.length - 1}
            >
              <img src={arrowRight} alt="right" />
            </button>
          </div>

          <BtnsDotPagination
            buttonsList={buttonsList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
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
