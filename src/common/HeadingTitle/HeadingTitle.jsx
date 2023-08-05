import { useState, useEffect, useRef } from 'react';
import s from './HeadingTitle.module.css';
// import './HeadingTitle.css';
import PropTypes from 'prop-types';

const HeadingTitle = ({ title }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const headerRef = useRef(null);

  //   const handleScroll = () => {
  //     // Проверяем, достиг ли скролл позиции заголовка
  //     const headerPosition = headerRef.current.getBoundingClientRect().top;
  //     const isVisible = headerPosition <= window.innerHeight;

  //     // Обновляем состояние isAnimated в зависимости от видимости заголовка
  //     setIsAnimated(isVisible);
  //   };

  //   // Добавляем слушатель события скролла при монтировании компонента
  //   useEffect(() => {
  //     window.addEventListener('scroll', handleScroll);
  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, []);
  // ==================================================
  useEffect(() => {
    // Задержка для запуска анимации через 1 секунду после загрузки страницы
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 1000);

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <div
      ref={headerRef}
      className={s.headerContainer}
      //   className={`${s.headerContainer} ${isAnimated ? s.animatedHeader : ''}`}
    >
      <h1 className={`${s.title} ${isAnimated ? s.animatedHeader : ''}`}>
        {title}
      </h1>
    </div>
  );
};

HeadingTitle.propTypes = {};

export default HeadingTitle;
