import { useMediaQuery } from 'react-responsive';
import loadMob from 'images/loader_logo_mob.png';
import load from 'images/loader_logo.png';

import s from './Loader.module.css';

const Loader = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  return (
    <div className={s.loaderBlock}>
      <div className={s.loaderWrapper}>
        <img
          className={s.logo}
          src={`${isDesktop ? load : loadMob}`}
          alt="logo"
        />
        <div className={s.loaderLine}></div>
      </div>
    </div>
  );
};

export default Loader;
