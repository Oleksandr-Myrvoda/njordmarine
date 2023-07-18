import { useTranslation } from 'react-i18next';
import { aboutFactConfig } from 'data/about-fact';
import { useMediaQuery } from 'react-responsive';
import ScrollUp from 'common/ScrollUp';
import SendInfo from 'common/SendInfo';
import AboutFactList from './AboutFactList';
import s from './AboutFactBlock.module.css';

const AbotFactBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  return (
    <div className={s.aboutFactBlock}>
      <div className={s.taglineAbout}>
        <p className="tagline">{t('abotFactBlock.tagline')}</p>
      </div>
      <AboutFactList aboutFactConfig={aboutFactConfig} />

      <SendInfo
        linkName={t('sendInfo.services')}
        linkPath="/services"
        hideLink={false}
      />

      {!isDesktop && <ScrollUp />}
    </div>
  );
};

export default AbotFactBlock;
