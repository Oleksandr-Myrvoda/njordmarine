import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import SendInfo from 'common/SendInfo';
import AdvantagesList from './AdvantagesList';
import { advantagesConfig } from 'data/advantages';
import s from './AdvantagesBlock.module.css';
import Container from 'common/Container/Container';

const AdvantagesBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  return (
    <div className={s.advantagesBlock}>
      <Container>
        <div className={s.textBlock}>
          <p className="headingBlock">{t('advantagesBlock.heading')}</p>
          <h2 className="tagline">{t('advantagesBlock.tagline')}</h2>
        </div>
        <AdvantagesList advantagesConfig={advantagesConfig} />
      </Container>

      {!isDesktop && <SendInfo linkName="" linkPath="" hideLink={true} />}
    </div>
  );
};

export default AdvantagesBlock;
