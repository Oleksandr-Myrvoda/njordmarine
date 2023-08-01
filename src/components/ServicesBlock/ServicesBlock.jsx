import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import SendInfo from 'common/SendInfo';
import ServiceList from './ServiceList';
// import { serviceConfig } from 'data/service';
import s from './ServicesBlock.module.css';
import Container from 'common/Container/Container';

const ServicesBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  return (
    <div className={s.servicesBlock}>
      <Container>
        <div className={s.orderWrapepr}>
          <div className={s.taglineBlock}>
            <p className="headingBlock">{t('servicesBlock.heading')}</p>
            <div className={s.tagline}>
              <h2 className="tagline">{t('servicesBlock.tagline')}</h2>
            </div>
          </div>

          {isDesktop && (
            <div className={s.sendInfo}>
              <SendInfo hideLink={true} />
            </div>
          )}
        </div>

        <ServiceList />
      </Container>
      {!isDesktop && <SendInfo hideLink={true} />}
    </div>
  );
};

export default ServicesBlock;
