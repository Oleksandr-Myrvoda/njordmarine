import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import delivery from 'images/del-Delivery.svg';
// import delivery from 'images/del-Delivery2.svg';
import s from './AdvantagesList.module.css';

const AdvantagesList = ({ advantagesConfig }) => {
  const { t } = useTranslation();
  const [isAnimated, setIsAnimated] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = itemRef.current;

      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.8 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setIsAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ul className={s.list} ref={itemRef}>
      {/* <img className={s.delivery} src={delivery} alt="delivery" /> */}
      {advantagesConfig.map(({ imgUrl, head, text, alt }, index) => (
        <li
          key={index}
          className={`${s.item} ${isAnimated ? s.animatedItem : ''}`}
        >
          <img className={s.image} src={imgUrl} alt={t(alt)} />
          <p className={s.head}>{t(head)}</p>
          <p className={s.descr}>{t(text)}</p>
        </li>
      ))}
    </ul>
  );
};

AdvantagesList.propTypes = {
  advantagesConfig: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      head: PropTypes.string,
      text: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default AdvantagesList;
