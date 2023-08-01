import s from './ScrollUp.module.css';

const ScrollUp = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <button onClick={scrollToTop} className={s.scroll}></button>;
};

export default ScrollUp;
