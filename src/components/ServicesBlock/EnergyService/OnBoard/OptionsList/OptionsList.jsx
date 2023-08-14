import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import dot from 'images/serv-auto-dotlist.svg';
import s from './OptionsList.module.css';
import Image from 'common/Image/Image';

const OptionsList = ({ config }) => {
  const { t } = useTranslation();
  const { title, list } = config;

  const [isAnimated, setIsAnimated] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = listRef.current;
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.7 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setIsAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={s.blockWrapper}>
      <div className={s.title}>{t(title)}:</div>
      <ul className={s.list} ref={listRef}>
        {list.map(({ text }, index) => (
          <li
            key={index}
            //  className={s.item}
            className={`${s.item} ${isAnimated ? s.animatedItem : ''}
       `}
          >
            <Image className={s.dotMarker} src={dot} alt="dot" />
            <div className={s.text}>{t(text)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// OptionsList.propTypes = {
//   config: PropTypes.arrayOf(
//     PropTypes.shape({
//       imgUrl: PropTypes.string,
//       head: PropTypes.string,
//       text: PropTypes.string,
//       alt: PropTypes.string,
//     }),
//   ).isRequired,
// };

export default OptionsList;
