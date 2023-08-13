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

import magnifer from 'images/maint-magnifer.svg';
import engeneer from 'images/maint-engeneer.svg';
import angular from 'images/maint-ruler-angular.svg';
import document from 'images/maint-document.svg';
import pen from 'images/maint-ruler-pen.svg';

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

  // SWIPER ======================================
  // const swiper = new Swiper('#swiper-2', {
  //   effect: 'fade',
  //   pagination: {
  //     el: 'swiper-1 .swiper-pagination',
  //     clickable: true,
  //   },
  //   slidesPerView: 1.5,
  //   centeredSlides: true,
  // });
  // ======================================

  return (
    <div className={s.blockWrapper} ref={headerRef}>
      <Trail open={isAnimated} heightD={60} heightMob={64}>
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

      {/* {isDesktop && (
        <section id="slider-2">
          <div className="slider-container wide">
            <div className="swiper" id="swiper-2">
              <div className="swiper-slide"></div>
            </div>
          </div>
        </section>
      )} */}

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
      {/* {isDesktop && (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true, el: '.swiper-pagination' }}
        >
          <SwiperSlide>
            <div className={s.currentSwiperCard}>
              <Card
                title={t('measurements.title1')}
                count="01."
                imgUrl={magnifer}
                text={t('measurements.text1')}
                alt={t('measurements.alt1')}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title={t('measurements.title2')}
              count="02."
              imgUrl={engeneer}
              text={t('measurements.text2')}
              alt={t('measurements.alt2')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title={t('measurements.title3')}
              count="03."
              imgUrl={angular}
              text={t('measurements.text3')}
              alt={t('measurements.alt3')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title={t('measurements.title4')}
              count="04."
              imgUrl={document}
              text={t('measurements.text4')}
              alt={t('measurements.alt4')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              title={t('measurements.title5')}
              count="05."
              imgUrl={pen}
              text={t('measurements.text5')}
              alt={t('measurements.alt5')}
            />
          </SwiperSlide>
        </Swiper>
      )} */}
      {/* {isDesktop && (
        <section id="slider-1">
          <div className="swiper" id="swiper-1">
            <div className="swiper-wrapper">
              <div
                className="swiper-slide"
                // className={s.list}
              >
                <Card
                  title={t('measurements.title1')}
                  count="01."
                  imgUrl={magnifer}
                  text={t('measurements.text1')}
                  alt={t('measurements.alt1')}
                />
              </div>
              <div className="swiper-slide">
                <Card
                  title={t('measurements.title2')}
                  count="02."
                  imgUrl={engeneer}
                  text={t('measurements.text2')}
                  alt={t('measurements.alt2')}
                />
              </div>
              <div className="swiper-slide">
                <Card
                  title={t('measurements.title3')}
                  count="03."
                  imgUrl={angular}
                  text={t('measurements.text3')}
                  alt={t('measurements.alt3')}
                />
              </div>
              <div className="swiper-slide">
                <Card
                  title={t('measurements.title4')}
                  count="04."
                  imgUrl={document}
                  text={t('measurements.text4')}
                  alt={t('measurements.alt4')}
                />
              </div>
              <div className="swiper-slide">
                <Card
                  title={t('measurements.title5')}
                  count="05."
                  imgUrl={pen}
                  text={t('measurements.text5')}
                  alt={t('measurements.alt5')}
                />
              </div>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </section>
      )} */}

      {/* {isDesktop && (
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
      )} */}
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
