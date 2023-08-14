// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  EffectFade,
  EffectCoverflow,
} from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import BtnsDotPagination from 'common/BtnsDotPagination';
import Card from './Card';

import arrowRight from 'images/pagi-arrow-right.svg';
import arrowLeft from 'images/pagi-arrow-left.svg';

import Trail from 'common/Trail';
import s from './Measurements.module.css';
import 'styles/swipeable.css';

import { useTransition, animated } from 'react-spring';

import magnifer from 'images/maint-magnifer.svg';
import engeneer from 'images/maint-engeneer.svg';
import angular from 'images/maint-ruler-angular.svg';
import document from 'images/maint-document.svg';
import pen from 'images/maint-ruler-pen.svg';
import Image from 'common/Image/Image';

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

  // SWIPER

  const [currentIndex, setCurrentIndex] = useState(2);

  const cardsPosition = [
    { id: 0, left: 85 },
    { id: 1, left: 300 },
    { id: 2, left: 510 },
    { id: 3, left: 725 },
    { id: 4, left: 940 },
  ];
  const visibleCards = cardsPosition.slice(currentIndex - 1, currentIndex + 2);

  const cardTransitions = useTransition(visibleCards, {
    key: card => card.id,
    from: { left: 300, opacity: 1 },
    enter: { left: item => item.left, opacity: 1 },
    leave: { left: 300, opacity: 1 },
  });
  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={s.blockWrapper} ref={headerRef}>
      <Trail open={isAnimated} heightD={60} heightMob={64}>
        <h2 className={s.tagline}>
          {t('services.meintenance.measurTagline')}:
        </h2>
      </Trail>

      {/* {isDesktop && (
        <div>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
          <div className={{ position: 'relative', height: '200px' }}>
            {cardTransitions((style, card) => (
              <animated.div
                key={card.id}
                className={`${s.cardItem} ${
                  currentIndex === card.id
                    ? s.currentCard
                    : currentIndex < card.id
                    ? s.nextCard
                    : s.prevCard
                }`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100px',
                  height: '100px',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'blue',
                  boxShadow:
                    card.id === currentIndex
                      ? '0 8px 8px 8px rgba(123, 170, 241, 0.3)'
                      : '',
                  zIndex: card.id === currentIndex ? 10 : '',
                  ...style,
                }}
              >
                <h3>Card {card.id + 1}</h3>
              </animated.div>
            ))}
          </div>
        </div>
      )} */}

      {!isDesktop && (
        <ul className={s.list}>
          {cards.map(({ imgUrl, count, title, text, alt }, index) => (
            <li key={index} className={s.cardItem}>
              <Image className={s.image} src={imgUrl} alt={t(alt)} />
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
        <div className={s.listD}>
          <div className={s.cards}>
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              spaceBetween={10}
              slidesPerView={2.2}
              centeredSlides={true}
              pagination={{ clickable: true }}
              // pagination={{
              //   clickable: true,
              //   el: '.swiper-cuspom-pugination',
              //   renderBullet: function (index, className) {
              //     return `<div className=${className}>
              //     <span className="number">${index + 1}</span>
              //     <span className="line"></span>
              //   </div>`;
              //   },
              // }}
              navigation={true}

              // loop={true}
              // spaceBetween={30}
              // effect={'fade'}
              // navigation={true}
              // pagination={{
              //   clickable: true,
              // }}
              // effect={'coverflow'}
              // grabCursor={true}
              // centeredSlides={true}
              // slidesPerView={'auto'}
              // coverflowEffect={{
              //   rotate: 50,
              //   stretch: 0,
              //   depth: 100,
              //   modifier: 1,
              //   slideShadows: true,
              // }}
              // pagination={true}
            >
              {cards.map(({ title, count, imgUrl, text, alt }) => (
                <SwiperSlide key={imgUrl}>
                  <Card
                    title={title}
                    count={count}
                    imgUrl={imgUrl}
                    text={text}
                    alt={alt}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {isDesktop && (
        <>
          <div className={s.list}>
            <button
              className={`${s.pagiBtnArrow}
               ${currentPage === 0 ? s.disabledBtn : ''}`}
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              <Image src={arrowLeft} alt="left" />
            </button>
            <div
              className={`${prevCurrentPage === 4 ? s.hideCard : s.prevCard}`}
            >
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
            <div
              className={`${nextCurrentPage === 0 ? s.hideCard : s.nextCard}`}
            >
              <Card
                title={cards[nextCurrentPage].title}
                count={cards[nextCurrentPage].count}
                imgUrl={cards[nextCurrentPage].imgUrl}
                text={cards[nextCurrentPage].text}
                alt={cards[nextCurrentPage].alt}
              />
            </div>
            <button
              className={`${s.pagiBtnArrow}
               ${currentPage === cards.length - 1 ? s.disabledBtn : ''}`}
              onClick={nextPage}
              disabled={currentPage === cards.length - 1}
            >
              <Image src={arrowRight} alt="right" />
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
