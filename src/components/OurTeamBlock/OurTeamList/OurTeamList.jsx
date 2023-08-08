import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';

import BtnsDotPagination from 'common/BtnsDotPagination';
import Card from './Card';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { useSwipeable } from 'react-swipeable';
import { useTranslation } from 'react-i18next';
import s from './OurTeamList.module.css';
import './swipeable.css';

const buttonsList = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

const OurTeamList = ({ ourTeamConfig: cards }) => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  // const [currentPage, setCurrentPage] = useState(0);
  // const [prevCurrentPage, setPrevCurrentPage] = useState(3);
  // const [nextCurrentPage, setNextCurrentPage] = useState(1);

  // useEffect(() => {
  //   currentPage === 0
  //     ? setPrevCurrentPage(3)
  //     : setPrevCurrentPage(currentPage - 1);

  //   currentPage === 3
  //     ? setNextCurrentPage(0)
  //     : setNextCurrentPage(currentPage + 1);
  // }, [currentPage]);

  // // SWIPE

  // const totalPages = cards.length;

  // const handlers = useSwipeable({
  //   onSwipedLeft: () => nextPage(),
  //   onSwipedRight: () => prevPage(),
  // });

  // const nextPage = () => {
  //   if (currentPage < totalPages - 1) {
  //     setCurrentPage(prevPage => prevPage + 1);
  //   }
  // };

  // const prevPage = () => {
  //   if (currentPage > 0) {
  //     setCurrentPage(prevPage => prevPage - 1);
  //   }
  // };

  return (
    <>
      {!isDesktop && (
        <div className={s.listMob}>
          <div className={s.cards}>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <Card
                  imgUrl={cards[0].imgUrlMob}
                  name={cards[0].name}
                  position={cards[0].position}
                  alt={cards[0].alt}
                />
              </SwiperSlide>

              <SwiperSlide>
                <Card
                  imgUrl={cards[1].imgUrlMob}
                  name={cards[1].name}
                  position={cards[1].position}
                  alt={cards[1].alt}
                />
              </SwiperSlide>

              <SwiperSlide>
                <Card
                  imgUrl={cards[2].imgUrlMob}
                  name={cards[2].name}
                  position={cards[2].position}
                  alt={cards[2].alt}
                />
              </SwiperSlide>

              <SwiperSlide>
                <Card
                  imgUrl={cards[3].imgUrlMob}
                  name={cards[3].name}
                  position={cards[3].position}
                  alt={cards[3].alt}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Card
                  imgUrl={cards[4].imgUrlMob}
                  name={cards[4].name}
                  position={cards[4].position}
                  alt={cards[4].alt}
                />
              </SwiperSlide>
            </Swiper>
            {/* <div className={`${currentPage === 0 ? s.cardHide : s.prevCard}`}>
              <Card
                imgUrl={cards[prevCurrentPage].imgUrlMob}
                name={cards[prevCurrentPage].name}
                position={cards[prevCurrentPage].position}
                alt={cards[prevCurrentPage].alt}
              />
            </div>
            <div className={s.currentCard}>
              <Card
                imgUrl={cards[currentPage].imgUrlMob}
                name={cards[currentPage].name}
                position={cards[currentPage].position}
                alt={cards[currentPage].alt}
              />
            </div>
            <div className={`${currentPage === 3 ? s.cardHide : s.nextCard}`}>
              <Card
                imgUrl={cards[nextCurrentPage].imgUrlMob}
                name={cards[nextCurrentPage].name}
                position={cards[nextCurrentPage].position}
                alt={cards[nextCurrentPage].alt}
              />
            </div> */}
          </div>

          {/* <BtnsDotPagination
            buttonsList={buttonsList}
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
          /> */}
        </div>
      )}

      {isDesktop && (
        <ul className={s.list}>
          {cards.map(({ imgUrl, name, position, alt }, index) => (
            <li key={index} className={s.item}>
              <div className={s.imageWrapper}>
                <img className={s.image} src={imgUrl} alt={alt} />
              </div>
              <p className={s.name}>{t(name)}</p>
              <p className={s.position}>{t(position)}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

OurTeamList.propTypes = {
  ourTeamConfig: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default OurTeamList;
