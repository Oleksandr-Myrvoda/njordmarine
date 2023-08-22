import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

import server from 'images/serv-focus-server.svg';
import satellite from 'images/serv-focus-satellite.svg';
import headphones from 'images/serv-focus-headphones.svg';
import doc from 'images/serv-focus-doc.svg';
import s from './FocusList.module.css';

const FocusList = () => {
  const { t } = useTranslation();
  const [isAnimated1, setIsAnimated1] = useState(false);
  const [isAnimated2, setIsAnimated2] = useState(false);
  const [isAnimated3, setIsAnimated3] = useState(false);
  const [isAnimated4, setIsAnimated4] = useState(false);
  const itemRef1 = useRef(null);
  const itemRef2 = useRef(null);
  const itemRef3 = useRef(null);
  const itemRef4 = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element1 = itemRef1.current;
      const element2 = itemRef2.current;
      const element3 = itemRef3.current;
      const element4 = itemRef4.current;

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
      if (element4) {
        const elementPosition = element4.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.9 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setIsAnimated4(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ul className={s.list}>
      <li className={s.itemList} ref={itemRef1}>
        <div
          className={`${s.item} ${isAnimated1 && s.animatedItem}
       `}
        >
          <img
            className={s.img}
            src={server}
            alt={t('focus.config.alt1')}
          ></img>
          <p className={s.title}>{t('focus.config.title1')}</p>
          <p className={s.text}>{t('focus.config.text1')}</p>
        </div>
      </li>
      <li className={s.itemList} ref={itemRef2}>
        <div
          className={`${s.item} ${isAnimated2 && s.animatedItem}
       `}
        >
          <img
            className={s.img}
            src={satellite}
            alt={t('focus.config.alt2')}
          ></img>
          <p className={s.title}>{t('focus.config.title2')}</p>
          <p className={s.text}>{t('focus.config.text2')}</p>
        </div>
      </li>
      <li className={s.itemList} ref={itemRef3}>
        <div
          className={`${s.item} ${isAnimated3 && s.animatedItem}
       `}
        >
          <img
            className={s.img}
            src={headphones}
            alt={t('focus.config.alt3')}
          ></img>
          <p className={s.title}>{t('focus.config.title3')}</p>
          <p className={s.text}>{t('focus.config.text3')}</p>
        </div>
      </li>
      <li className={s.itemList} ref={itemRef4}>
        <div
          className={`${s.item} ${isAnimated4 && s.animatedItem}
       `}
        >
          <img className={s.img} src={doc} alt={t('focus.config.alt4')}></img>
          <p className={s.title}>{t('focus.config.title4')}</p>
          <p className={s.text}>{t('focus.config.text4')}</p>
        </div>
      </li>
    </ul>
  );
};

export default FocusList;
