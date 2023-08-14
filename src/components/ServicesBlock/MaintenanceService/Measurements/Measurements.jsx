// // import Swiper and modules styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import 'swiper/css/effect-fade';
// import 'swiper/css/effect-coverflow';
// import 'styles/swipeable.css';
// import './MeasurementsAnimation.css';

// import {
//   A11y,
//   EffectCoverflow,
//   EffectFade,
//   Navigation,
//   Pagination,
//   Scrollbar,
// } from 'swiper/modules';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// // import Swiper from 'swiper';
// // import { Navigation, Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { animated, useTransition } from 'react-spring';
// import { useEffect, useRef, useState } from 'react';

// import BtnsDotPagination from 'common/BtnsDotPagination';
// import Card from './Card';
// import Image from 'common/Image/Image';
// import PropTypes from 'prop-types';
// import Trail from 'common/Trail';
// import angular from 'images/maint-ruler-angular.svg';
// import arrowLeft from 'images/pagi-arrow-left.svg';
// import arrowRight from 'images/pagi-arrow-right.svg';
// import clsx from 'clsx';
// import document from 'images/maint-document.svg';
// import engeneer from 'images/maint-engeneer.svg';
// import magnifer from 'images/maint-magnifer.svg';
// import pen from 'images/maint-ruler-pen.svg';
// import s from './Measurements.module.css';
// import { useMediaQuery } from 'react-responsive';
// import { useTranslation } from 'react-i18next';

// const buttonsList = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

// const Measurements = ({ measurementsConfig: cards }) => {
//   const { t } = useTranslation();
//   const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
//   const [currentPage, setCurrentPage] = useState(0);
//   const [prevCurrentPage, setPrevCurrentPage] = useState(4);
//   const [nextCurrentPage, setNextCurrentPage] = useState(1);

//   const [isAnimated, setIsAnimated] = useState(false);
//   const headerRef = useRef(null);

//   // CSSTransition

//   const [curCard, setCurCard] = useState(null); // toPrev | toNext
//   const [nextCard, setNextCard] = useState(null); // fromNext | fromPrev
//   const [prevCard, setPrevCard] = useState(null); // fromNext | fromPrev

//   const prevCardRef = useRef(null);
//   const curCardRef = useRef(null);
//   const nextCardRef = useRef(null);

//   // CSSTransition -END

//   useEffect(() => {
//     currentPage === 0
//       ? setPrevCurrentPage(4)
//       : setPrevCurrentPage(currentPage - 1);

//     currentPage === 4
//       ? setNextCurrentPage(0)
//       : setNextCurrentPage(currentPage + 1);
//   }, [currentPage]);

//   const nextPage = () => {
//     setCurrentPage(prevPage => Math.min(prevPage + 1, cards.length - 1));
//     setPrevCurrentPage(prevPage => Math.min(prevPage + 1, cards.length - 1));
//     setNextCurrentPage(prevPage => Math.min(prevPage + 1, cards.length - 1));
//   };

//   const prevPage = () => {
//     setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
//     setPrevCurrentPage(prevPage => Math.max(prevPage - 1, 0));
//     setNextCurrentPage(prevPage => Math.max(prevPage - 1, 0));
//   };

//   // ============= Header =============

//   useEffect(() => {
//     const handleResize = () => {
//       const windowHeight = window.innerHeight;

//       if (windowHeight > 800 && !isDesktop) {
//         setIsAnimated(true);
//       }
//     };

//     const handleScroll = () => {
//       const element = headerRef.current;
//       if (element) {
//         const elementPosition = element.getBoundingClientRect().top;
//         const screenHeight = window.innerHeight;
//         const visibleThreshold = 0.7 * screenHeight;

//         if (elementPosition <= visibleThreshold) {
//           setIsAnimated(true);
//         }
//       }
//     };

//     handleResize();

//     // Добавляем обработчик события изменения размера окна
//     window.addEventListener('resize', handleResize);
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [isDesktop]);

//   // SWIPER

//   const [currentIndex, setCurrentIndex] = useState(2);

//   const cardsPosition = [
//     { id: 0, left: 85 },
//     { id: 1, left: 300 },
//     { id: 2, left: 510 },
//     { id: 3, left: 725 },
//     { id: 4, left: 940 },
//   ];
//   const visibleCards = cardsPosition.slice(currentIndex - 1, currentIndex + 2);

//   const cardTransitions = useTransition(visibleCards, {
//     key: card => card.id,
//     from: { left: 300, opacity: 1 },
//     enter: { left: item => item.left, opacity: 1 },
//     leave: { left: 300, opacity: 1 },
//   });
//   const handleNext = () => {
//     if (currentIndex < cards.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   // ==================

//   const [dirrection, setDirrection] = useState(null);

//   // ==================

//   return (
//     <div className={s.blockWrapper} ref={headerRef}>
//       <Trail open={isAnimated} heightD={60} heightMob={64}>
//         <h2 className={s.tagline}>
//           {t('services.meintenance.measurTagline')}:
//         </h2>
//       </Trail>

//       {/* Custom Mobile version */}
//       {!isDesktop && (
//         <ul className={s.list}>
//           {cards.map(({ imgUrl, count, title, text, alt }, index) => (
//             <li key={index} className={s.cardItem}>
//               <Image className={s.image} src={imgUrl} alt={t(alt)} />
//               <div className={s.titleWrapper}>
//                 <p className={s.count}>{count}</p>
//                 <p className={s.title}>{t(title)}</p>
//               </div>
//               <p className={s.text}>{t(text)}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//       {/* Custom Mobile version -END */}

//       {isDesktop && (
//         <>
//           <div className={s.list}>
//             <button
//               className={`${s.pagiBtnArrow}
//                ${currentPage === 0 ? s.disabledBtn : ''}`}
//               onClick={prevPage}
//               disabled={currentPage === 0}
//             >
//               <Image src={arrowLeft} alt="left" />
//             </button>

//             <CSSTransition
//               in={!!dirrection}
//               nodeRef={prevCardRef}
//               timeout={500}
//               classNames="fromPrev"
//               unMountOnEnter
//             >
//               <div
//                 onClick={() => {
//                   console.log('object');
//                   setDirrection(p => !p);
//                 }}
//                 className={`${prevCurrentPage === 4 ? s.hideCard : s.prevCard}`}
//               >
//                 <Card
//                   title={cards[prevCurrentPage].title}
//                   count={cards[prevCurrentPage].count}
//                   imgUrl={cards[prevCurrentPage].imgUrl}
//                   text={cards[prevCurrentPage].text}
//                   alt={cards[prevCurrentPage].alt}
//                 />
//               </div>
//             </CSSTransition>

//             <CSSTransition
//               nodeRef={curCardRef}
//               timeout={500}
//               classNames={clsx(
//                 s.curCard,
//                 curCard === 'toNext' && s.toNext,
//                 curCard === 'toPrev' && s.toPrev,
//               )}
//             >
//               <div className={s.currentCard}>
//                 <Card
//                   title={cards[currentPage].title}
//                   count={cards[currentPage].count}
//                   imgUrl={cards[currentPage].imgUrl}
//                   text={cards[currentPage].text}
//                   alt={cards[currentPage].alt}
//                 />
//               </div>
//             </CSSTransition>
//             <CSSTransition
//               nodeRef={nextCardRef}
//               timeout={500}
//               classNames={clsx(
//                 s.nextCard,
//                 nextCard === 'fromNext' && s.fromNext,
//               )}
//             >
//               <div
//                 className={`${nextCurrentPage === 0 ? s.hideCard : s.nextCard}`}
//               >
//                 <Card
//                   title={cards[nextCurrentPage].title}
//                   count={cards[nextCurrentPage].count}
//                   imgUrl={cards[nextCurrentPage].imgUrl}
//                   text={cards[nextCurrentPage].text}
//                   alt={cards[nextCurrentPage].alt}
//                 />
//               </div>
//             </CSSTransition>

//             <button
//               className={`${s.pagiBtnArrow}
//                ${currentPage === cards.length - 1 ? s.disabledBtn : ''}`}
//               onClick={nextPage}
//               disabled={currentPage === cards.length - 1}
//             >
//               <Image src={arrowRight} alt="right" />
//             </button>
//           </div>

//           <BtnsDotPagination
//             buttonsList={buttonsList}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//           />
//         </>
//       )}

//       {/* {isDesktop && (
//         <div>
//           <button onClick={handlePrev}>Previous</button>
//           <button onClick={handleNext}>Next</button>
//           <div className={{ position: 'relative', height: '200px' }}>
//             {cardTransitions((style, card) => (
//               <animated.div
//                 key={card.id}
//                 className={`${s.cardItem} ${
//                   currentIndex === card.id
//                     ? s.currentCard
//                     : currentIndex < card.id
//                     ? s.nextCard
//                     : s.prevCard
//                 }`}
//                 style={{
//                   position: 'absolute',
//                   top: '50%',
//                   left: '50%',
//                   width: '100px',
//                   height: '100px',
//                   transform: 'translate(-50%, -50%)',
//                   backgroundColor: 'blue',
//                   boxShadow:
//                     card.id === currentIndex
//                       ? '0 8px 8px 8px rgba(123, 170, 241, 0.3)'
//                       : '',
//                   zIndex: card.id === currentIndex ? 10 : '',
//                   ...style,
//                 }}
//               >
//                 <h3>Card {card.id + 1}</h3>
//               </animated.div>
//             ))}
//           </div>
//         </div>
//       )} */}

//       {/* {isDesktop && (
//         <div className={s.listD}>
//           <div className={s.cards}>
//             <Swiper
//               modules={[Navigation, Pagination, EffectCoverflow]}
//               spaceBetween={10}
//               slidesPerView={2.2}
//               centeredSlides={true}
//               pagination={{ clickable: true }}
//               // pagination={{
//               //   clickable: true,
//               //   el: '.swiper-cuspom-pugination',
//               //   renderBullet: function (index, className) {
//               //     return `<div className=${className}>
//               //     <span className="number">${index + 1}</span>
//               //     <span className="line"></span>
//               //   </div>`;
//               //   },
//               // }}
//               navigation={true}

//               // loop={true}
//               // spaceBetween={30}
//               // effect={'fade'}
//               // navigation={true}
//               // pagination={{
//               //   clickable: true,
//               // }}
//               // effect={'coverflow'}
//               // grabCursor={true}
//               // centeredSlides={true}
//               // slidesPerView={'auto'}
//               // coverflowEffect={{
//               //   rotate: 50,
//               //   stretch: 0,
//               //   depth: 100,
//               //   modifier: 1,
//               //   slideShadows: true,
//               // }}
//               // pagination={true}
//             >
//               {cards.map(({ title, count, imgUrl, text, alt }) => (
//                 <SwiperSlide key={imgUrl}>
//                   <Card
//                     title={title}
//                     count={count}
//                     imgUrl={imgUrl}
//                     text={text}
//                     alt={alt}
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// };

// Measurements.propTypes = {
//   measurementsConfig: PropTypes.arrayOf(
//     PropTypes.shape({
//       imgUrl: PropTypes.string,
//       count: PropTypes.string,
//       title: PropTypes.string,
//       text: PropTypes.string,
//       alt: PropTypes.string,
//     }),
//   ).isRequired,
// };
// export default Measurements;

// ==============
// ==============
// ==============

// import 'bootstrap/dist/css/bootstrap.min.css';
import './MeasurementsAnimation.css';

// import { Button, Form } from 'react-bootstrap';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import React, { useEffect } from 'react';

const modes = ['out-in', 'in-out'];

export default function App() {
  const [mode, setMode] = React.useState('out-in');
  const [state, setState] = React.useState(true);
  const helloRef = React.useRef(null);
  const goodbyeRef = React.useRef(null);
  const nodeRef = state ? helloRef : goodbyeRef;
  const nodeRefP = React.useRef(null);
  // ===
  // const [mode1, setMode1] = React.useState('out-in');
  const [state1, setState1] = React.useState(true);
  const helloRef1 = React.useRef(null);
  const goodbyeRef1 = React.useRef(null);
  const nodeRef1 = state1 ? helloRef1 : goodbyeRef1;
  // const nodeRefP = React.useRef(null);
  // const nodeRefC = React.useRef(null);
  // const nodeRefN = React.useRef(null);

  useEffect(() => {
    // nodeRefP.current
  });
  return (
    <>
      <div className="label">Mode:</div>
      <div className="container-mmmmm">
        <SwitchTransition mode={mode}>
          <CSSTransition
            key={state}
            nodeRef={nodeRef}
            addEndListener={done => {
              nodeRef.current.addEventListener('transitionend', done, false);
            }}
            classNames="fromPrev"
          >
            <div ref={nodeRef} className="button-container">
              <button
                className="box-mmmmm"
                onClick={() => setState(state => !state)}
              >
                {state ? 'Hello, world!' : 'Goodbye, world!'}
              </button>
            </div>

            {/* <div
              ref={nodeRefP}
              style={{ width: 300, height: 300 }}
              className="box-mmmmmm"
            ></div> */}
          </CSSTransition>
          {/* <CSSTransition
            key={state1}
            nodeRef={nodeRef1}
            addEndListener={done => {
              nodeRef1.current.addEventListener('transitionend', done, false);
            }}
            classNames="fromPrev"
          >
            <div ref={nodeRef1} className="button-container">
              <button
                className="btn-mmmmm"
                onClick={() => setState1(state => !state)}
              >
                {state1 ? 'Hello, world!' : 'Goodbye, world!'}
              </button>
            </div>
          </CSSTransition> */}
          {/* <CSSTransition
            key={state}
            nodeRef={nodeRefC}
            addEndListener={done => {
              nodeRefC.current.addEventListener('transitionend', done, false);
            }}
            classNames="fromCurToRight"
          >
            <div
              ref={nodeRefC}
              style={{ width: 300, height: 300 }}
              className="box-mmmmmm"
            ></div>
          </CSSTransition>
          <CSSTransition
            key={state}
            nodeRef={nodeRefN}
            addEndListener={done => {
              nodeRefN.current.addEventListener('transitionend', done, false);
            }}
            classNames="fromNextToRight"
          >
            <div
              ref={nodeRefN}
              style={{ width: 300, height: 300 }}
              className="box-mmmmmm"
            ></div>
          </CSSTransition> */}
        </SwitchTransition>
      </div>
    </>
  );
}
