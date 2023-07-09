import { useMediaQuery } from 'react-responsive';
import ship from 'images/hero-bg-mob.png';
import SendInfo from 'common/SendInfo';
import s from './HeroBlock.module.css';

const HeroBlock = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  return (
    <div className={s.heroBlock}>
      <div className={s.heroContent}>
        <div className={s.heroWrapper}>
          <p className={s.head}>
            Европейская компания с высококачественными решениями
          </p>
          <h1 className="taglineBig">
            Ваш надежный <br /> помощник <br />
            по сервису судов
          </h1>

          <p className={s.description}>
            NJORDMARINE заботится о своих клиентах и ​​ценит их время, поэтому
            мы предоставляем необходимое оборудование, оригинальные и OEM
            запчасти, а также сервисное обслуживание в кратчайшие сроки и по
            разумной цене.
          </p>
        </div>

        {!isDesktop && <img src={ship} alt="ship" />}

        <SendInfo
          linkName="Ознакомиться с услугами"
          linkPath="/"
          hideLink={false}
        />

        <div className={s.nav}></div>
        <ul className={s.list}>
          <li className={s.listItem}>
            <p className={s.top}>800+</p>
            <p className={s.bot}>Выполненных проектов</p>
          </li>
          <li className={s.listItem}>
            <p className={s.top}>5 лет</p>
            <p className={s.bot}>На рынке</p>
          </li>
          <li className={s.listItem}>
            <p className={s.top}>20</p>
            <p className={s.bot}>Стран</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default HeroBlock;
