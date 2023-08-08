import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Paper from 'common/Paper';

import refreshSquare from 'images/service-RefreshSquare.svg';
import settings from 'images/service-Settings.svg';
import tools from 'images/service-Tools.svg';
import diagramUp from 'images/service-DiagramUp.svg';
import s from './ServiceList.module.css';

const ServiceList = () => {
  const { t } = useTranslation();
  const [isAnimated1, setIsAnimated1] = useState(false);
  const [isAnimated2, setIsAnimated2] = useState(false);
  const [isAnimated3, setIsAnimated3] = useState(false);
  const [isAnimated4, setIsAnimated4] = useState(false);

  const itemRef1 = useRef(null);
  const itemRef2 = useRef(null);
  const itemRef3 = useRef(null);
  const itemRef4 = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const element1 = itemRef1.current;
      const element2 = itemRef2.current;
      const element3 = itemRef3.current;
      const element4 = itemRef4.current;

      if (element1) {
        const elementPosition = element1.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.7 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setIsAnimated1(true);
        }
      }
      if (element2) {
        const elementPosition = element2.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.7 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setIsAnimated2(true);
        }
      }
      if (element3) {
        const elementPosition = element3.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.7 * screenHeight;

        if (elementPosition <= visibleThreshold) {
          setIsAnimated3(true);
        }
      }
      if (element4) {
        const elementPosition = element4.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        const visibleThreshold = 0.7 * screenHeight;

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
      <li ref={itemRef1}>
        <Paper>
          <NavLink to="services/automation" onClick={scrollToTop}>
            <div
              className={`${s.item} ${isAnimated1 ? s.animatedItem : ''} 
       `}
            >
              <img 
                className={s.image}
                src={refreshSquare}
                alt={t('servicesBlock.list.alt1')}
              />
              <p className={s.descr}>{t('servicesBlock.list.text1')}</p>
              <p className={s.link}>{t('servicesBlock.list.link')}</p>
            </div>
          </NavLink>
        </Paper>
      </li>
      <li ref={itemRef2}>
        <Paper>
          <NavLink to="services/maintenance" onClick={scrollToTop}>
            <div
              className={`${s.item} ${isAnimated2 ? s.animatedItem : ''} 
       `}
            >
              <img
                className={s.image}
                src={settings}
                alt={t('servicesBlock.list.alt2')}
              />
              <p className={s.descr}>{t('servicesBlock.list.text2')}</p>
              <p className={s.link}>{t('servicesBlock.list.link')}</p>
            </div>
          </NavLink>
        </Paper>
      </li>
      <li ref={itemRef3}>
        <Paper>
          <NavLink to="spares" onClick={scrollToTop}>
            <div
              className={`${s.item} ${isAnimated3 ? s.animatedItem : ''} 
       `}
            >
              <img
                className={s.image}
                src={tools}
                alt={t('servicesBlock.list.alt3')}
              />
              <p className={s.descr}>{t('servicesBlock.list.text3')}</p>
              <p className={s.link}>{t('servicesBlock.list.link')}</p>
            </div>
          </NavLink>
        </Paper>
      </li>
      <li ref={itemRef4}>
        <Paper>
          <NavLink to="services/energy" onClick={scrollToTop}>
            <div
              className={`${s.item} ${isAnimated4 ? s.animatedItem : ''} 
       `}
            >
              <img
                className={s.image}
                src={diagramUp}
                alt={t('servicesBlock.list.alt4')}
              />
              <p className={s.descr}>{t('servicesBlock.list.text4')}</p>
              <p className={s.link}>{t('servicesBlock.list.link')}</p>
            </div>
          </NavLink>
        </Paper>
      </li>
    </ul>
  );
};

export default ServiceList;
