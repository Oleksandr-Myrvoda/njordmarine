import { useTranslation } from 'react-i18next';
import { aboutFactConfig } from 'data/about-fact';
import { useMediaQuery } from 'react-responsive';
import ScrollUp from 'common/ScrollUp';
import SendInfo from 'common/SendInfo';
import AboutFactList from './AboutFactList';
import s from './AboutFactBlock.module.css';
import Container from 'common/Container/Container';

const AbotFactBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  return (
    <div className={s.aboutFactBlock}>
      <Container>
        <div className={s.taglineAbout}>
          <p className="tagline">{t('abotFactBlock.tagline')}</p>
        </div>
        <AboutFactList aboutFactConfig={aboutFactConfig} />

        <div className={s.sendInfo}>
          <SendInfo
            linkName={t('sendInfo.services')}
            linkPath="/services"
            hideLink={false}
          />
        </div>
      </Container>

      {!isDesktop && <ScrollUp />}
    </div>
  );
};

export default AbotFactBlock;
