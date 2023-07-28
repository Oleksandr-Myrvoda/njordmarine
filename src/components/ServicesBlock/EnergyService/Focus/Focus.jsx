import SendInfo from 'common/SendInfo/SendInfo';
import { focusConfig, focusOptionsConfig } from 'data/focus';
import { useTranslation } from 'react-i18next';

import FocusList from './FocusList';
import ListWithDot from '../ListWithDot';
import s from './Focus.module.css';

const Focus = () => {
  const { t } = useTranslation();
  return (
    <div className={s.blockWrapper}>
      <div className={s.hero}>
        <p className={s.title}>{t('focus.title')}</p>
      </div>

      <p className={s.text}>
        <span className={s.span}>{t('focus.textBold')} </span> -{' '}
        {t('focus.text')}.
      </p>
      <div className={s.headblock}>
        <h1 className={s.head}>{t('focus.head')}</h1>
        <p className={s.text}>{t('focus.text2')}</p>
      </div>

      <FocusList focusConfig={focusConfig} />

      <h2 className={s.titleBottom}>{t('focus.titleBottom')}</h2>

      <ListWithDot config={focusOptionsConfig} />

      <div className={s.sendInfo}>
        <SendInfo
          linkName={t('sendInfo.office')}
          linkPath="/services/energy/office"
          hideLink={false}
        />
      </div>
    </div>
  );
};

export default Focus;
