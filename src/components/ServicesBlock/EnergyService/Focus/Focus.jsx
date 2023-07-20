import SendInfo from 'common/SendInfo/SendInfo';
import { focusConfig, focusOptionsConfig } from 'data/focus';
import { useTranslation } from 'react-i18next';
import dot from 'images/serv-auto-dotlist.svg';
import s from './Focus.module.css';
import FocusList from './FocusList/FocusList';
import ListWithDot from '../ListWithDot/ListWithDot';

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

      <SendInfo
        linkName={t('sendInfo.office')}
        linkPath="/services/energy/office"
        hideLink={false}
      />
    </div>
  );
};

export default Focus;
