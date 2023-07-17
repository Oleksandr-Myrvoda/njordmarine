import SendInfo from 'common/SendInfo';
import OptionsBlock from './OptionsBlock';
import quotes from 'images/quotes.svg';
import s from './OnBoard.module.css';

const OnBoard = () => {
  return (
    <div className={s.blockWrapper}>
      <div className={s.hero}>
        <p className={s.title}>Решение на борту</p>
      </div>

      <div className={s.descrWrapper}>
        <img className={s.quotes} src={quotes} alt="quotes" />

        <p className={s.head}>
          Ваш первый шаг к снижению расхода топлива и повышению эффективности
          эксплуатационных характеристик судна
        </p>
        <p className={s.text}>
          Наша система прекрасно интегрируется с другими установленными на борту
          судна системами, позволяя отображать все необходимые параметры.
        </p>
      </div>

      <div className={s.stroke}></div>

      <OptionsBlock />

      <SendInfo
        linkName="Система FOCUS для флота"
        linkPath="/services/energy/focus"
        hideLink={false}
      />
    </div>
  );
};

export default OnBoard;
