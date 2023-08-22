import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import fact01 from 'images/about-company-fact01.png';
import fact02 from 'images/about-company-fact02.png';
import fact03 from 'images/about-company-fact03.png';
import s from './AboutFactList.module.css';

const AboutFactList = ({ aboutFactConfig }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const { t } = useTranslation();
  const [isAnimated1, setIsAnimated1] = useState(false);
  const [isAnimated2, setIsAnimated2] = useState(false);
  const [isAnimated3, setIsAnimated3] = useState(false);
  const itemRef1 = useRef(null);
  const itemRef2 = useRef(null);
  const itemRef3 = useRef(null);

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
      }
    };

    const handleScroll = () => {
      const element1 = itemRef1.current;
      const element2 = itemRef2.current;
      const element3 = itemRef3.current;

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
    <ul className={s.list}>
      <li className={s.itemList} ref={itemRef1}>
        <div
          className={`${s.item} ${isAnimated1 ? s.animatedItem : ''}
       `}
        >
          <img
            className={s.image}
            src={fact01}
            alt={t('abotFactBlock.list.text1')}
          />
          <p className={s.count}>01.</p>
          <p className={s.descr}>{t('abotFactBlock.list.text1')}</p>
        </div>
      </li>
      <li className={s.itemList} ref={itemRef2}>
        <div
          className={`${s.item} ${isAnimated2 ? s.animatedItem : ''}
       `}
        >
          <img
            className={s.image}
            src={fact02}
            alt={t('abotFactBlock.list.text2')}
          />
          <p className={s.count}>02.</p>
          <p className={s.descr}>{t('abotFactBlock.list.text2')}</p>
        </div>
      </li>
      <li className={s.itemList} ref={itemRef3}>
        <div
          className={`${s.item} ${isAnimated3 ? s.animatedItem : ''}
       `}
        >
          <img
            className={s.image}
            src={fact03}
            alt={t('abotFactBlock.list.text3')}
          />
          <p className={s.count}>03.</p>
          <p className={s.descr}>{t('abotFactBlock.list.text3')}</p>
        </div>
      </li>
    </ul>
    // <ul className={s.list} ref={itemRef1}>
    //   {aboutFactConfig.map(({ imgUrl, count, text, alt }, index) => (
    //     <li key={index} className={s.itemList}>
    //       <div
    //         className={`${s.item} ${isAnimated1 ? s.animatedItem : ''}
    //    `}
    //       >
    //         <img className={s.image} src={imgUrl} alt={t(alt)} />
    //         <p className={s.count}>{count}</p>
    //         <p className={s.descr}>{t(text)}</p>
    //       </div>
    //     </li>
    //   ))}
    // </ul>
  );
};

// AboutFactList.propTypes = {
//   aboutFactConfig: PropTypes.arrayOf(
//     PropTypes.shape({
//       imgUrl: PropTypes.string,
//       count: PropTypes.string,
//       text: PropTypes.string,
//       alt: PropTypes.string,
//     }),
//   ).isRequired,
// };

export default AboutFactList;
