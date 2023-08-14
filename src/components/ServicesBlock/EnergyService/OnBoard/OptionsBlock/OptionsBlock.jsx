import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import RoundButton from 'common/RoundButton';
import OptionsList from '../OptionsList';
import { configs } from 'data/energy-options';

import arrow1mob from 'images/energy-dots/arrow-mob1.svg';
import arrow2mob from 'images/energy-dots/arrow-mob2.svg';
import arrow3mob from 'images/energy-dots/arrow-mob3.svg';
import arrow4mob from 'images/energy-dots/arrow-mob4.svg';
import arrow1 from 'images/energy-dots/arrow1.svg';
import arrow2 from 'images/energy-dots/arrow2.svg';
import arrow3 from 'images/energy-dots/arrow3.svg';
import arrow4 from 'images/energy-dots/arrow4.svg';

import s from './OptionsBlock.module.css';

const OptionsBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [cardOptions, setCardOptions] = useState(configs.consumers);
  const [activeButton, setActiveButton] = useState('consumers');

  const setConfig = configName => {
    setActiveButton(configName);
    setCardOptions(configs[configName]);
  };

  return (
    <div className={s.optionsWrapper}>
      <h2 className={s.optionsTitle}>
        {t('services.energy.onBoard.optionsTitle')}:
      </h2>

      {/* BUTTON 1 */}
      <div
        className={`${s.btn1} ${
          activeButton === 'consumers' ? s.active : s.btn1
        }`}
      > 
        <RoundButton onClick={setConfig} configName="consumers" />
      </div>
      <img
        className={`${activeButton === 'consumers' ? s.arrow1 : s.arrowHide}`}
        src={isDesktop ? arrow1 : arrow1mob}
        alt="arrow"
      />

      {/* BUTTON 2 */}
      <div
        className={`${s.btn2} ${activeButton === 'control' ? s.active : ''}`}
      >
        <RoundButton onClick={setConfig} configName="control" />
      </div>
      <img
        className={`${activeButton === 'control' ? s.arrow2 : s.arrowHide}`}
        src={isDesktop ? arrow2 : arrow2mob}
        alt="arrow"
      />

      {/* BUTTON 3 */}
      <div className={`${s.btn3} ${activeButton === 'option' ? s.active : ''}`}>
        <RoundButton onClick={setConfig} configName="option" />
      </div>
      <img
        className={`${activeButton === 'option' ? s.arrow3 : s.arrowHide}`}
        src={isDesktop ? arrow3 : arrow3mob}
        alt="arrow"
      />

      {/* BUTTON 4 */}
      <div
        className={`${s.btn4} ${activeButton === 'additional' ? s.active : ''}`}
      >
        <RoundButton onClick={setConfig} configName="additional" />
      </div>
      <img
        className={`${activeButton === 'additional' ? s.arrow4 : s.arrowHide}`}
        src={isDesktop ? arrow4 : arrow4mob}
        alt="arrow"
      />

      <div className={s.options}>
        {isDesktop && <OptionsList config={cardOptions} />}
      </div>

      {!isDesktop && <OptionsList config={cardOptions} />}
    </div>
  );
};

OptionsBlock.propTypes = {};

export default OptionsBlock;
