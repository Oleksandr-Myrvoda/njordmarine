import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import AdvantagesList from './AdvantagesList';
import { advantagesConfig } from 'data/advantages';
import s from './AdvantagesBlock.module.css';
// import BigButton from 'common/BigButton/BigButton';
import SendInfo from 'common/SendInfo';

const AdvantagesBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  return (
    <div className={s.advantagesBlock}>
      <div className={s.textBlock}>
        <p className="headingBlock">{t('advantagesBlock.heading')}</p>
        <h2 className="tagline">{t('advantagesBlock.tagline')}</h2>
      </div>
      <AdvantagesList advantagesConfig={advantagesConfig} />

      {!isDesktop && <SendInfo linkName="" linkPath="" hideLink={true} />}
    </div>
  );
};

export default AdvantagesBlock;
