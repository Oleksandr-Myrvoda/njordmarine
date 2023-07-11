import SendInfo from 'common/SendInfo/SendInfo';
import { focusConfig, focusOptionsConfig } from 'data/focus';

import dot from 'images/serv-auto-dotlist.svg';
import s from './Focus.module.css';
import FocusList from './FocusList/FocusList';

const Focus = () => {
  return (
    <div className={s.blockWrapper}>
      <div className={s.hero}>
        <p className={s.title}>Система Focus для флота</p>
      </div>

      <p className={s.text}>
        <span className={s.span}>Система FOCUS для флота </span> - это система
        контроля, учета топлива и энергоэффективности флота.
      </p>
      <div className={s.headblock}>
        <h1 className={s.head}>Как работает система FOCUS</h1>
        <p className={s.text}>
          Четкое взаимодействие между флотом и офисом поможет выстроить все
          процессы на высоком уровне и сократить дальнейшие расходы.
        </p>
      </div>

      <FocusList focusConfig={focusConfig} />

      <h2 className={s.titleBottom}>
        Система FOCUS была разработана для выполнения всех этих процессов как
        единый продукт
      </h2>

      <ul className={s.listOptions}>
        {focusOptionsConfig.map(({ text }, index) => (
          <li key={index} className={s.itemOptions}>
            <img src={dot} alt="dot"></img>
            <div className={s.textOptions}>{text}</div>
          </li>
        ))}
      </ul>

      <SendInfo linkName="Офисное решение" linkPath="/" hideLink={false} />
    </div>
  );
};

export default Focus;
