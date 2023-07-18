import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import SendInfo from 'common/SendInfo';
import ServiceList from './ServiceList';
// import { serviceConfig } from 'data/service';
import s from './ServicesBlock.module.css';

const ServicesBlock = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

  return (
    <div className={s.servicesBlock}>
      <div className={s.orderWrapepr}>
        <div className={s.taglineBlock}>
          <p className="headingBlock">{t('servicesBlock.heading')}</p>
          <h2 className="tagline">{t('servicesBlock.tagline')}</h2>
        </div>

        {isDesktop && (
          <div className={s.sendInfo}>
            <SendInfo hideLink={true} />
          </div>
        )}
      </div>

      <ServiceList />
      {/* <ServiceList serviceConfig={serviceConfig} /> */}

      {!isDesktop && <SendInfo hideLink={true} />}
    </div>
  );
};

export default ServicesBlock;
