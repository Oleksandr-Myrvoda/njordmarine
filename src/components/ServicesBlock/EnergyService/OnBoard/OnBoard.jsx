import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import {
  consumersConfig,
  controlConfig,
  optionConfig,
  additionalConfig,
} from 'data/energy-options';
// import { energyOptionsConfig } from 'data/energy-options';

import SendInfo from 'common/SendInfo';
import RoundButton from 'common/RoundButton';
import OptionsList from './OptionsList';
import quotes from 'images/quotes.svg';
import s from './OnBoard.module.css';

const OnBoard = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [configList, setConfigList] = useState(consumersConfig);
  // console.log('configList', configList);

  // useEffect(() => {
  //   setConfigList(consumersConfig);
  // }, []);

  // const onClick = e => {
  //   let list = consumersConfig;
  //   if (e.target.id === 1) list = consumersConfig;
  //   if (e.target.id === 2) list = controlConfig;
  //   if (e.target.id === 3) list = optionConfig;
  //   if (e.target.id === 4) list = additionalConfig;

  //   return setConfigList(list);
  // };

  // console.log('configList', consumersConfig);

  const onClick = e => {
    console.log(e.target.id);
    let list = consumersConfig;
    if (e.target.id === 1) {
      list = consumersConfig;
      // setConfigList(consumersConfig);
    } else if (e.target.id === 2) {
      list = controlConfig;
      // setConfigList(controlConfig);
    } else if (e.target.id === 3) {
      list = optionConfig;
      // setConfigList(optionConfig);
    } else {
      list = additionalConfig;
      // setConfigList(additionalConfig);
    }
    console.log('list', list);

    return setConfigList(list);
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

        <RoundButton onClick={onClick} id="1" />
        <RoundButton onClick={onClick} id="2" />
        <RoundButton onClick={onClick} id="3" />
        <RoundButton onClick={onClick} id="4" />

        <div className={s.options}>
          {isDesktop && <OptionsList config={configList} />}
          {/* <OptionsList config={additionalConfig} /> */}
        </div>

        {!isDesktop && <OptionsList config={configList} />}
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
