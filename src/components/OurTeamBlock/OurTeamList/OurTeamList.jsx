import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useSwipeable } from 'react-swipeable';
import BtnsDotPagination from 'common/BtnsDotPagination';
import Card from './Card';
import s from './OurTeamList.module.css';
import PropTypes from 'prop-types';

const buttonsList = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

const OurTeamList = ({ ourTeamConfig: cards }) => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  const [currentPage, setCurrentPage] = useState(0);
  const [prevCurrentPage, setPrevCurrentPage] = useState(3);
  const [nextCurrentPage, setNextCurrentPage] = useState(1);

  useEffect(() => {
    currentPage === 0
      ? setPrevCurrentPage(3)
      : setPrevCurrentPage(currentPage - 1);

    currentPage === 3
      ? setNextCurrentPage(0)
      : setNextCurrentPage(currentPage + 1);
  }, [currentPage]);

  // SWIPE

  const totalPages = cards.length;

  const handlers = useSwipeable({
    onSwipedLeft: () => nextPage(),
    onSwipedRight: () => prevPage(),
  });

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <>
      {!isDesktop && (
        <div className={s.listMob} {...handlers}>
          <div className={s.cards}>
            <div className={`${currentPage === 0 ? s.cardHide : s.prevCard}`}>
              <Card
                imgUrl={cards[prevCurrentPage].imgUrl}
                name={cards[prevCurrentPage].name}
                position={cards[prevCurrentPage].position}
                alt={cards[prevCurrentPage].alt}
              />
            </div>
            <div className={s.currentCard}>
              <Card
                imgUrl={cards[currentPage].imgUrl}
                name={cards[currentPage].name}
                position={cards[currentPage].position}
                alt={cards[currentPage].alt}
              />
            </div>
            <div className={`${currentPage === 3 ? s.cardHide : s.nextCard}`}>
              <Card
                imgUrl={cards[nextCurrentPage].imgUrl}
                name={cards[nextCurrentPage].name}
                position={cards[nextCurrentPage].position}
                alt={cards[nextCurrentPage].alt}
              />
            </div>
          </div>

          <BtnsDotPagination
            buttonsList={buttonsList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {isDesktop && (
        <ul className={s.list}>
          {cards.map(({ imgUrl, name, position, alt }, index) => (
            <li key={index} className={s.item}>
              <img className={s.image} src={imgUrl} alt={alt} />
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
