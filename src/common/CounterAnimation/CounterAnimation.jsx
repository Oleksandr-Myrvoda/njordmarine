import { useEffect, useState } from 'react';
import s from './CounterAnimation.module.css';
import PropTypes from 'prop-types';

const CounterAnimation = ({ endValue }) => {
  const [count, setCount] = useState(0);

  // Обновление счетчика от 0 до 800 в течение 2 секунд
  useEffect(() => {
    let startValue = 0;
    // const endValue = 800;
    const duration = 2000; // Длительность анимации в миллисекундах
    const interval = 10; // Интервал обновления счетчика

    const totalSteps = duration / interval;
    const stepValue = (endValue - startValue) / totalSteps;

    const timer = setInterval(() => {
      startValue += stepValue;
      if (startValue >= endValue) {
        clearInterval(timer);
        startValue = endValue;
      }
      setCount(Math.floor(startValue));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return <p className={s.counterAnimation}>{count}</p>;
};

CounterAnimation.propTypes = {};

export default CounterAnimation;
