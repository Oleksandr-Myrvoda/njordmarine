import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import SendInfo from 'common/SendInfo';
import RoundButton from 'common/RoundButton';
import OptionsList from './OptionsList';
import { configs } from 'data/energy-options';
import quotes from 'images/quotes.svg';
import s from './OnBoard.module.css';

const OnBoard = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [cardOptions, setCardOptions] = useState(configs.additional);

  const setConfig = configName => {
    setCardOptions(configs[configName]);
  };

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

      <div className={s.optionsWrapper}>
        <h2 className={s.optionsTitle}>
          Параметры контролируемые системой установленной на судне:
        </h2>

        <RoundButton onClick={setConfig} configName="consumers" />
        <RoundButton onClick={setConfig} configName="control" />
        <RoundButton onClick={setConfig} configName="option" />
        <RoundButton onClick={setConfig} configName="additional" />
        {/* {buttonOptions.map(el => (
          <RoundButton key={el.id} {...el} onClick={setCardOptions} />
        ))} */}

        <div className={s.options}>
          {isDesktop && <OptionsList config={cardOptions} />}
        </div>

        {!isDesktop && <OptionsList config={cardOptions} />}
      </div>

      <SendInfo
        linkName="Система FOCUS для флота"
        linkPath="/"
        hideLink={false}
      />
    </div>
  );
};

export default OnBoard;
