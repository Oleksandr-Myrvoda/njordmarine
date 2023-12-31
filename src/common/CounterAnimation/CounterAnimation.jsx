import { useEffect, useState } from 'react';
import s from './CounterAnimation.module.css';
import PropTypes from 'prop-types';

const CounterAnimation = ({ endValue }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startValue = 0;
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

CounterAnimation.propTypes = {
  endValue: PropTypes.string.isRequired,
};

export default CounterAnimation;
